// pages/CartPage.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
    useGetCartSummeryQuery,
    useRemoveFromCartMutation,
    useUpdateCartQuantityMutation,
    eCommerceApi,
} from "../redux/services/eCommerceApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("authToken");

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

    // Plus Button – স্টকের বেশি যেতে দেবে না
    const handlePlus = (id, currentQty, availableStock) => {
        const qty = Number(currentQty) || 0;
        const stock = Number(availableStock) || 0;

        if (qty >= stock) {
            toast.warn(`Only ${stock} item(s) available in stock`);
            return;
        }

        handleQuantityChange(id, qty + 1);
    };

    // Minus Button – ১ এর নিচে যাবে না
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
            toast.error("Failed to remove");
        }
    };

    if (isSummaryLoading) {
        return (
            <div className="min-h-screen py-8 px-5 2xl:px-20 bg-dark1 animate-pulse">
                <div className="max-w-6xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="h-10 bg-dark2 rounded-lg w-64 mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Side - Cart Items Skeleton */}
                        <div className="md:col-span-2">
                            <div className="bg-dark2 rounded-lg shadow-md overflow-hidden">
                                <div className="p-6 border-b border-gray/30">
                                    <div className="h-7 bg-dark3 rounded w-48"></div>
                                </div>

                                <div className="divide-y divide-gray/30">
                                    {/* ৩টা আইটেমের স্কেলেটন দেখাবে */}
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                                        >
                                            {/* Image Skeletons */}
                                            <div className="flex gap-2">
                                                <div className="w-24 h-24 bg-dark3 rounded-lg"></div>
                                                <div className="w-24 h-24 bg-dark3 rounded-lg hidden sm:block"></div>
                                            </div>

                                            {/* Text & Price Skeletons */}
                                            <div className="flex-1 space-y-3">
                                                <div className="h-6 bg-dark3 rounded w-3/4"></div>
                                                <div className="h-5 bg-dark3 rounded w-24"></div>
                                                <div className="h-5 bg-dark3 rounded w-32"></div>

                                                {/* Quantity Buttons Skeleton */}
                                                <div className="flex items-center gap-3 mt-4">
                                                    <div className="flex">
                                                        <div className="w-8 h-8 bg-dark3 rounded-l-md"></div>
                                                        <div className="w-12 h-8 bg-dark3"></div>
                                                        <div className="w-8 h-8 bg-dark3 rounded-r-md"></div>
                                                    </div>
                                                    <div className="w-8 h-8 bg-dark3 rounded"></div>
                                                </div>
                                            </div>

                                            {/* Total Price Skeleton */}
                                            <div className="h-8 bg-dark3 rounded w-20"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Order Summary Skeleton */}
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
        <div className="min-h-screen py-8 px-5 2xl:px-20 bg-dark1">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl md:text-3xl md:font-bold text-cream mb-8">
                    Your Shopping Cart
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2">
                        <div className="bg-dark2 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6 border-b border-gray/30">
                                <h2 className="text-xl font-semibold text-gray">
                                    Cart Items (
                                    {cartSummery?.data?.cart_items?.length || 0}
                                    )
                                </h2>
                            </div>

                            <div className="divide-y divide-gray/30">
                                {cartSummery?.data?.cart_items?.length === 0 ? (
                                    <div className="p-6 text-center text-gray">
                                        Your cart is empty
                                    </div>
                                ) : (
                                    cartSummery?.data?.cart_items?.map(
                                        (item) => {
                                            const hasImage = (path) =>
                                                path && path.trim() !== "";
                                            const thumb = hasImage(
                                                item.product?.thumb_image
                                            )
                                                ? `/${item.product.thumb_image}`
                                                : null;
                                            const front = hasImage(
                                                item?.front_image
                                            )
                                                ? `/${item.front_image}`
                                                : null;
                                            const back = hasImage(
                                                item?.back_image
                                            )
                                                ? `/${item.back_image}`
                                                : null;
                                            const hasAnyImage =
                                                thumb || front || back;

                                            // স্টক কত আছে
                                            const availableStock =
                                                item.product?.qty || 0;
                                            const currentQty =
                                                item.quantity || 1;
                                            const isMaxReached =
                                                currentQty >= availableStock;

                                            console.log(item);

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                                                >
                                                    {/* Images */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {thumb && (
                                                            <img
                                                                src={thumb}
                                                                alt=""
                                                                className="w-24 h-24 object-cover rounded-lg"
                                                            />
                                                        )}
                                                        {front && (
                                                            <img
                                                                src={front}
                                                                alt=""
                                                                className="w-24 h-24 object-contain rounded-lg"
                                                            />
                                                        )}
                                                        {back && (
                                                            <img
                                                                src={back}
                                                                alt=""
                                                                className="w-24 h-24 object-cover rounded-lg"
                                                            />
                                                        )}
                                                        {!hasAnyImage && (
                                                            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-cream">
                                                            {
                                                                item?.product
                                                                    ?.name
                                                            }
                                                        </h3>
                                                        <p className="text-sm md:text-lg font-bold text-gray mt-1">
                                                            $
                                                            {Number(item.price)}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray mt-1">
                                                            Extra Price $
                                                            {Number(
                                                                item.extra_price
                                                            )}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-3 mt-4">
                                                            {/* Quantity */}
                                                            <div className="flex">
                                                                <button
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            item.id,
                                                                            item.quantity
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    disabled={
                                                                        item.quantity <=
                                                                        1
                                                                    }
                                                                >
                                                                    −
                                                                </button>

                                                                <span className="w-12 h-8 flex items-center justify-center bg-gray-100 font-medium">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>

                                                                <button
                                                                    onClick={() =>
                                                                        handlePlus(
                                                                            item.id,
                                                                            item.quantity,
                                                                            availableStock
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    disabled={
                                                                        isMaxReached
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>

                                                            {/* অপশনাল: স্টক শেষ হলে মেসেজ দেখানো */}
                                                            {isMaxReached && (
                                                                <p className="text-yellow-500 text-xs">
                                                                    Max
                                                                    available:{" "}
                                                                    {
                                                                        availableStock
                                                                    }
                                                                </p>
                                                            )}

                                                            <Link
                                                                to={`/product/${item?.product?.slug}/customize`}
                                                                className="text-green-600 hover:text-green-400 text-sm md:text-base"
                                                            >
                                                                Customize
                                                                Product
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <FaRegTrashAlt />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Total */}
                                                    <div className="mt-2 sm:mt-0">
                                                        <p className="text-lg font-bold text-cream">
                                                            $
                                                            {Number(
                                                                item.price
                                                            ) * item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )
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
                            <div className="p-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-cream">Subtotal</span>
                                    <span className="font-medium text-cream">
                                        ${cartSummery?.data?.sub_total || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-cream">Discount</span>
                                    <span className="font-medium text-green-600">
                                        -$
                                        {Number(
                                            cartSummery?.data?.discount || 0
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold mb-6 pt-4 border-t border-gray/30">
                                    <span className="text-cream">Total</span>
                                    <span className="text-cream">
                                        ${cartSummery?.data?.sub_total || 0}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!token) {
                                            // Current page-এ ফিরে আসার জন্য URL পাস করো
                                            const currentPath =
                                                window.location.pathname;
                                            navigate(
                                                `/signin?redirect=${encodeURIComponent(
                                                    currentPath
                                                )}`
                                            );
                                            toast.warn(
                                                "Please login to continue shopping!",
                                                {
                                                    position: "top-center",
                                                }
                                            );
                                        } else {
                                            navigate("/checkout");
                                        }
                                    }}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                                    disabled={
                                        isSummaryLoading ||
                                        (cartSummery?.data?.cart_items
                                            ?.length || 0) === 0
                                    }
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
