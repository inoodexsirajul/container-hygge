import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import {
    useAddToCartMutation,
    useGetCartDetailsQuery,
    useGetCurrencyQuery,
} from "../redux/services/eCommerceApi";
import { toast } from "react-toastify";

const ProductCardTwo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const { refetch } = useGetCartDetailsQuery();
    const { data: currency } = useGetCurrencyQuery();

    const token = localStorage.getItem("authToken");

    const isOutOfStock = !product.qty || product.qty <= 0;
    const hasOptions =
        product?.colors?.length > 0 || product?.sizes?.length > 0;

    const handleAddToCart = async () => {
        if (isOutOfStock) {
            toast.error("This product is out of stock!");
            return;
        }

        try {
            const cartItem = { product_id: product.id, qty: quantity };
            await addToCart(cartItem).unwrap();
            refetch();
            toast.success("Product added to cart!");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to add to cart");
        }
    };

    return (
        <div className="w-full  mx-auto transition-all duration-500 overflow-hidden hover:-translate-y-1 relative">
            {/* Out of Stock Badge  */}
            {isOutOfStock && (
                <div className="absolute top-3 left-3 z-10 bg-red text-cream text-xs font-mont font-semibold px-3 py-1 rounded-full shadow-lg">
                    Out of Stock
                </div>
            )}

            {/* Product Image Container */}
            <div
                className={`relative overflow-hidden rounded-xl ${
                    isOutOfStock ? "opacity-70" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={`/${product.thumb_image}`}
                    alt={product.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 hover:scale-105 h-full rounded-xl"
                />

                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-dark2/70 flex items-center justify-center">
                        <div className="flex flex-col space-y-3">
                            {isOutOfStock ? (
                                // Out of stock হলে বাটন ডিজেবল + লাল
                                <button
                                    disabled
                                    className="w-full flex font-mont justify-between items-center text-[12px] md:text-[18px] border border-red bg-red/80 text-cream rounded-[10px] mb-4 px-4 py-2 md:px-[30px] md:py-[15px] cursor-not-allowed opacity-80"
                                >
                                    Out of Stock
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </button>
                            ) : !hasOptions ? (
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    className={`w-full flex justify-between items-center text-[10px] md:text-[14px] border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5 cursor-pointer ${
                                        isLoading ? "bg-gray-500" : "bg-red"
                                    }`}
                                >
                                    {isLoading ? "Adding..." : "Add to cart"}
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={`/product-details/${product?.slug}`}
                                    className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-red border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-2.5 md:py-[7px]"
                                >
                                    Select Option
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </Link>
                            )}

                            <Link
                                to={`/product-details/${product?.slug}`}
                                className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-dark2 border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5"
                            >
                                Details
                                <span>
                                    <GoArrowRight />
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="px-2 mt-2">
                <h4 className="text-cream text-[12px] xl:text-[14px] font-normal md:font-semibold font-mont mb-2.5">
                    <Link
                        to={`/product-details/${product?.slug}`}
                        className="font-mont truncate"
                    >
                        {product?.name}
                    </Link>
                </h4>

                <div className="">
                    <p className="text-[12px] xl:text-[17px] text-cream font-mont">
                        {currency?.settings?.currency_icon}
                        {product?.offer_price
                            ? product?.offer_price
                            : product?.price}
                    </p>
                    {product?.offer_price && (
                        <p className="text-red line-through decoration-cream text-[12px] xl:text-[14px] font-mont font-medium">
                            {currency?.settings?.currency_icon}
                            {product?.price}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCardTwo;
