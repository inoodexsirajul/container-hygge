import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import {
    useAddToCartMutation,
    useGetCartDetailsQuery,
} from "../redux/services/eCommerceApi";
import { toast } from "react-toastify";
// import baseurl from "../utils/url";

const ProductCardTwo = ({ product }) => {
    const [quantity, setQuantity] = useState(1); // ডিফল্ট কোয়ান্টিটি
    const [isHovered, setIsHovered] = useState(false);
    const [addToCart, { isLoading, error }] = useAddToCartMutation();
    const { refetch } = useGetCartDetailsQuery(); // কার্ট আপডেট করার জন্য

    const token = localStorage.getItem("authToken");

    const handleAddToCart = async () => {
        try {
            const cartItem = {
                product_id: product.id,
                qty: quantity,
            };
            await addToCart(cartItem).unwrap();
            refetch(); // কার্ট আপডেট
            toast.success("Product added to cart!");
        } catch (err) {
            toast.error(err?.data?.message || "  to add to cart");
            // console.log(err);
        }
    };

    // চেক করো colors এবং sizes খালি কিনা
    const hasOptions =
        product?.colors?.length > 0 || product?.sizes?.length > 0;

    return (
        <div className="w-full mx-auto transition-all duration-500 overflow-hidden hover:-translate-y-1">
            {/* Product Image Container */}
            <div
                className="relative overflow-hidden rounded-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={`/${product.thumb_image}`}
                    alt={product.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 hover:scale-105 h-full rounded-xl"
                />

                {/* Overlay on hover */}
                {isHovered && (
                    <div className="absolute inset-0 bg-dark2/70 flex items-center justify-center">
                        <div className="flex flex-col space-y-3">
                            {!hasOptions ? (
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    className={`w-full flex justify-between items-center text-[12px] md:text-[18px] border border-transparent hover:border-cream rounded-[10px] text-cream bg-opacity-100 mb-4 px-4 py-2 md:px-[30px] md:py-[15px] cursor-pointer ${
                                        isLoading ? "bg-gray-500" : "bg-red"
                                    }`}
                                >
                                    {isLoading ? "Adding..." : "Add to cart"}
                                    <span className="">
                                        <GoArrowRight />
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={`/product-details/${product?.slug}`}
                                    className="w-full flex justify-between items-center text-[12px] md:text-[18px] md:p-[30px] bg-red border border-transparent hover:border-cream rounded-[10px] text-cream bg-opacity-100 mb-4 px-4 py-2 md:px-[30px] md:py-[15px]"
                                >
                                    Select Option
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </Link>
                            )}
                            <Link
                                to={`/product-details/${product?.slug}`}
                                className="w-full flex justify-between items-center text-[12px] md:text-[18px] md:p-[30px] bg-dark2 border border-transparent hover:border-cream rounded-[10px] text-cream bg-opacity-100 mb-4 px-4 py-2 md:px-[30px] md:py-[15px]"
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
                {/* Product title */}
                <h4 className="text-cream text-[12px] 2xl:text-[18px] font-normal md:font-semibold font-manrope mb-2.5">
                    <Link to={`/product-details/${product?.slug}`}>
                        {product?.name}
                    </Link>
                </h4>
                {/* Price section */}

                <div className="flex gap-4">
                    {/* Offer price or regular price */}
                    <p
                        className={`text-[12px] 2xl:text-[16px] ${
                            product?.offer_price ? "text-cream" : "text-cream"
                        }`}
                    >
                        $
                        {product?.offer_price
                            ? product?.offer_price
                            : product?.price}
                    </p>

                    {/* Regular price with line-through if offer price exists */}
                    {product?.offer_price && (
                        <p className="text-red line-through decoration-cream text-[12px] 2xl:text-[16px]">
                            ${product?.price}
                        </p>
                    )}
                </div>

                {/* Color swatches */}
                {product.colors?.length > 0 && (
                    <div className="flex space-x-1 mt-2 2xl:mt-4">
                        {product.colors.map((color, index) => (
                            <button
                                key={index}
                                className={`w-3 lg:w-[18px] h-3 lg:h-[18px] border rounded-[5px]  `}
                                style={{ backgroundColor: color?.color_code }}
                                onClick={() =>
                                    setSelectedColor(color?.color_code)
                                }
                                aria-label={`Color: ${color?.color_code}`}
                            />
                        ))}
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <p className="text-red text-[12px] mt-2">
                        {error?.data?.message || "Error adding to cart"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCardTwo;
