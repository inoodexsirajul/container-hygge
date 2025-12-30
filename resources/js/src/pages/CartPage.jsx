// pages/CartPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
    useGetCartSummeryQuery,
    useRemoveFromCartMutation,
    useUpdateCartQuantityMutation,
    eCommerceApi,
    useGetCurrencyQuery,
} from "../redux/services/eCommerceApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("authToken");
    const { data: currency } = useGetCurrencyQuery();

    const {
        data: cartSummery,
        isLoading: isSummaryLoading,
        error: summaryError,
    } = useGetCartSummeryQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [removeFromCartMutation] = useRemoveFromCartMutation();
    const [updateCartQuantityMutation] = useUpdateCartQuantityMutation();

    // Error Handling
    useEffect(() => {
        if (summaryError?.status === 401) {
            localStorage.removeItem("authToken");
            navigate("/signin");
        } else if (summaryError) {
            toast.error(summaryError?.data?.message || "Failed to load cart");
        }
    }, [summaryError, navigate]);

    // Plus Button
    const handlePlus = (id, currentQty, availableStock) => {
        const qty = Number(currentQty) || 0;
        const stock = Number(availableStock) || 0;

        if (qty >= stock) {
            toast.warn(`Only ${stock} item(s) available in stock`);
            return;
        }

        handleQuantityChange(id, qty + 1);
    };

    // Minus Button
    const handleMinus = (id, currentQty) => {
        const qty = Number(currentQty) || 0;
        if (qty <= 1) return;
        handleQuantityChange(id, qty - 1);
    };

    // Quantity Change with Optimistic Update
    const handleQuantityChange = async (id, newQuantity) => {
        const qty = Number(newQuantity);
        if (isNaN(qty) || qty < 1) return;

        const patchResult = dispatch(
            eCommerceApi.util.updateQueryData(
                "getCartSummery",
                undefined,
                (draft) => {
                    const item = draft.data.cart_items.find((i) => i.id === id);
                    if (item) item.quantity = newQuantity;
                }
            )
        );

        try {
            await updateCartQuantityMutation({
                id,
                quantity: newQuantity,
            }).unwrap();
        } catch (error) {
            patchResult.undo();
            toast.error(error?.data?.message || "Update failed");
        }
    };

    // Remove Item with Optimistic Update
    const removeFromCart = async (id) => {
        const patchResult = dispatch(
            eCommerceApi.util.updateQueryData(
                "getCartSummery",
                undefined,
                (draft) => {
                    draft.data.cart_items = draft.data.cart_items.filter(
                        (item) => item.id !== id
                    );
                }
            )
        );

        try {
            await removeFromCartMutation(id).unwrap();
        } catch {
            patchResult.undo();
        }
    };

    // ==================== PROMOTION LOGIC ====================
    const cartItems = cartSummery?.data?.cart_items || [];
    const promotions = cartSummery?.data?.promotions || [];

    // ফ্রি প্রোডাক্ট প্রমোশন আছে কিনা? (API থেকে promotions চেক)
    const hasFreeProductPromotion = promotions.some(
        (p) => p.type === "free_product"
    );

    // কার্টে ফ্রি আইটেম আছে কিনা
    const freeItemInCart = cartItems.find((item) => item.is_free_product === true);

    // ফ্রি আইটেমের আসল দাম কত ছিল (ডিসকাউন্ট দেখানোর জন্য)
    const freeItemOriginalPrice = freeItemInCart
        ? (Number(freeItemInCart.price) + Number(freeItemInCart.extra_price || 0)) * freeItemInCart.quantity
        : 0;

    // টোটাল ক্যালকুলেট — ফ্রি আইটেমের দাম সম্পূর্ণ বাদ
    const calculatedTotal = cartItems.reduce((acc, item) => {
        if (item.is_free_product) return acc;
        return acc + (Number(item.price) + Number(item.extra_price || 0)) * item.quantity;
    }, 0);

    // কারেন্সি আইকন
    const currencyIcon = currency?.settings?.currency_icon || cartSummery?.data?.currency_icon || "$";

    if (isSummaryLoading) {
        return (
            <div className="min-h-screen py-8 px-5 2xl:px-20 bg-dark1 animate-pulse">
                <div className="max-w-6xl mx-auto">
                    <div className="h-10 bg-dark2 rounded-lg w-64 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="bg-dark2 rounded-lg shadow-md overflow-hidden">
                                <div className="p-6 border-b border-gray/30">
                                    <div className="h-7 bg-dark3 rounded w-48"></div>
                                </div>
                                <div className="divide-y divide-gray/30">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                            <div className="flex gap-2">
                                                <div className="w-24 h-24 bg-dark3 rounded-lg"></div>
                                                <div className="w-24 h-24 bg-dark3 rounded-lg hidden sm:block"></div>
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="h-6 bg-dark3 rounded w-3/4"></div>
                                                <div className="h-5 bg-dark3 rounded w-24"></div>
                                                <div className="h-5 bg-dark3 rounded w-32"></div>
                                                <div className="flex items-center gap-3 mt-4">
                                                    <div className="flex">
                                                        <div className="w-8 h-8 bg-dark3 rounded-l-md"></div>
                                                        <div className="w-12 h-8 bg-dark3"></div>
                                                        <div className="w-8 h-8 bg-dark3 rounded-r-md"></div>
                                                    </div>
                                                    <div className="w-8 h-8 bg-dark3 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="h-8 bg-dark3 rounded w-20"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-dark2 rounded-lg shadow-md sticky top-8">
                                <div className="p-6 border-b border-gray/30">
                                    <div className="h-7 bg-dark3 rounded w-40"></div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between">
                                        <div className="h-5 bg-dark3 rounded w-20"></div>
                                        <div className="h-5 bg-dark3 rounded w-24"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-5 bg-dark3 rounded w-20"></div>
                                        <div className="h-5 bg-dark3 rounded w-24"></div>
                                    </div>
                                    <div className="pt-4 border-t border-gray/30">
                                        <div className="flex justify-between mb-4">
                                            <div className="h-6 bg-dark3 rounded w-16"></div>
                                            <div className="h-7 bg-dark3 rounded w-28"></div>
                                        </div>
                                    </div>
                                    <div className="h-12 bg-green-800/50 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 bg-dark1">
            <div className="max-w-[1200px] mx-auto px-4 2xl:px-20">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-xl md:text-3xl md:font-bold text-cream mb-8">
                        Your Shopping Cart
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2">
                            {/* =============== FREE PRODUCT BANNER =============== */}
                            {hasFreeProductPromotion && (
                                <div className="mb-8 p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl text-white">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold">
                                                🎉 Free Product Unlocked!
                                            </h3>
                                            <p className="mt-2 text-lg opacity-90">
                                                Congratulations! You qualify for a FREE gift.
                                            </p>
                                            {freeItemInCart ? (
                                                <p className="mt-3 text-yellow-200 font-medium">
                                                    ✅ Your free gift: <strong>{freeItemInCart.product?.name}</strong>
                                                </p>
                                            ) : (
                                                <p className="mt-3 text-yellow-100">
                                                    Add any product to your cart — it will be FREE!
                                                </p>
                                            )}
                                        </div>

                                        {!freeItemInCart && (
                                            <button
                                                onClick={() => navigate("/shop")}
                                                className="px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-xl hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                                            >
                                                 Unlock your free item
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="bg-dark2 rounded-lg shadow-md overflow-hidden">
                                <div className="p-6 border-b border-gray/30">
                                    <h2 className="text-xl font-semibold text-gray">
                                        Cart Items ({cartItems.length})
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray/30">
                                    {cartItems.length === 0 ? (
                                        <div className="p-6 text-center text-gray">
                                            Your cart is empty
                                        </div>
                                    ) : (
                                        cartItems.map((item) => {
                                            const isFree = item.is_free_product === true;

                                            const hasImage = (path) => path && path.trim() !== "";
                                            const thumb = hasImage(item.product?.thumb_image)
                                                ? `/${item.product.thumb_image}`
                                                : null;
                                            const front = hasImage(item?.front_image)
                                                ? `/${item.front_image}`
                                                : null;
                                            const back = hasImage(item?.back_image)
                                                ? `/${item.back_image}`
                                                : null;
                                            const hasAnyImage = thumb || front || back;

                                            const availableStock = item.product?.qty || 0;
                                            const currentQty = item.quantity || 1;
                                            const isMaxReached = currentQty >= availableStock;

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative"
                                                >
                                                    {isFree && (
                                                        <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full z-10 shadow-md">
                                                            FREE GIFT
                                                        </div>
                                                    )}

                                                    <div className={`flex flex-wrap gap-2 ${isFree ? "opacity-80" : ""}`}>
                                                        {thumb && <img src={thumb} alt={item.product?.name} className="w-24 h-24 object-cover rounded-lg" />}
                                                        {front && <img src={front} alt="Front" className="w-24 h-24 object-contain rounded-lg" />}
                                                        {back && <img src={back} alt="Back" className="w-24 h-24 object-cover rounded-lg" />}
                                                        {!hasAnyImage && (
                                                            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-cream flex items-center gap-2">
                                                            {item.product?.name}
                                                            {isFree && <span className="text-green-400 text-sm font-bold">(Free Item)</span>}
                                                        </h3>

                                                        <p className="text-lg font-bold mt-1">
                                                            {isFree ? (
                                                                <span className="text-green-500 text-2xl">FREE</span>
                                                            ) : (
                                                                <>
                                                                    <span className="text-gray">
                                                                        {currencyIcon}{Number(item.price).toFixed(2)}
                                                                    </span>
                                                                    {item.extra_price > 0 && (
                                                                        <span className="block text-sm text-gray-400">
                                                                            + Extra: {currencyIcon}{Number(item.extra_price)}
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </p>

                                                        {!isFree && (
                                                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                                                <div className="flex items-center">
                                                                    <button
                                                                        onClick={() => handleMinus(item.id, item.quantity)}
                                                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
                                                                        disabled={item.quantity <= 1}
                                                                    >
                                                                        −
                                                                    </button>
                                                                    <span className="w-12 h-8 flex items-center justify-center bg-gray-100 font-medium">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handlePlus(item.id, item.quantity, availableStock)}
                                                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
                                                                        disabled={isMaxReached}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>

                                                                {isMaxReached && (
                                                                    <p className="text-yellow-500 text-xs">
                                                                        Max available: {availableStock}
                                                                    </p>
                                                                )}

                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="text-red-600 hover:text-red-700"
                                                                >
                                                                    <FaRegTrashAlt size={20} />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {isFree && (
                                                            <p className="text-sm text-green-400 mt-4 italic">
                                                                This is your complimentary gift. Cannot modify or remove.
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 text-right">
                                                        <p className="text-xl font-bold text-cream">
                                                            {isFree
                                                                ? "FREE"
                                                                : `${currencyIcon}${(
                                                                      Number(item.price) * item.quantity +
                                                                      Number(item.extra_price || 0) * item.quantity
                                                                  ).toFixed(2)}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-dark2 rounded-lg shadow-md sticky top-8">
                                <div className="p-6 border-b border-gray/30">
                                    <h2 className="text-xl font-semibold text-cream">
                                        Order Summary
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-cream">Subtotal</span>
                                        <span className="text-cream">
                                            {currencyIcon}
                                            {cartSummery?.data?.sub_total || "0.00"}
                                        </span>
                                    </div>

                                    {/* Free Gift Discount */}
                                    {freeItemInCart && (
                                        <div className="flex justify-between text-green-500 font-bold text-lg">
                                            <span>Free Gift Discount</span>
                                            <span>
                                                -{currencyIcon}{freeItemOriginalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray/30">
                                        <div className="flex justify-between text-2xl font-bold mb-6">
                                            <span className="text-cream">Total</span>
                                            <span className="text-green-400">
                                                {currencyIcon}{calculatedTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (!token) {
                                                const currentPath = window.location.pathname;
                                                navigate(`/signin?redirect=${encodeURIComponent(currentPath)}`);
                                                toast.warn("Please login to continue shopping!");
                                            } else {
                                                navigate("/checkout");
                                            }
                                        }}
                                        className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:opacity-50 transition"
                                        disabled={isSummaryLoading || cartItems.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;