import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { GoArrowRight } from "react-icons/go";

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // ডিভাইস টাইপ চেক করা
        const checkIsMobile = () => {
            return window.innerWidth <= 768;
        };

        setIsMobile(checkIsMobile());

        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTouchStart = () => {
        if (isMobile) {
            setIsHovered(true);
        }
    };

    const handleTouchEnd = (e) => {
        if (isMobile) {
            // যদি ব্যবহারকারী বাটনে ট্যাপ করে থাকে, তাহলে হোভার স্টেট বন্ধ করবেন না
            if (e.target.closest("button, a")) {
                return;
            }
            setIsHovered(false);
        }
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="max-w-full mb-[27px] relative overflow-hidden group transition-all duration-500">
                <img
                    src={product?.img}
                    alt={product?.title}
                    className="w-full"
                />

                {/* image overlay */}
                <div
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-500 bg-dark2 ${
                        isHovered ? "opacity-70 flex" : "opacity-0"
                    } md:opacity-0 md:group-hover:opacity-70 md:hidden md:group-hover:flex`}
                ></div>

                <div
                    className={`absolute top-0 left-0 w-full h-full justify-center items-end md:mb-20 px-4 md:px-[50px] ${
                        isHovered ? "flex opacity-100" : "hidden opacity-0"
                    } md:hidden md:group-hover:flex md:opacity-0 md:group-hover:opacity-100 transition-all duration-500`}
                >
                    <div className="flex flex-col md:mb-16 relative w-full">
                        <button
                            className="w-full flex justify-between items-center text-[12px] md:text-[18px] bg-red border border-transparent hover:border-cream rounded-[10px] text-cream bg-opacity-100 mb-4 px-4 py-1 md:px-[30px] md:py-[30px]"
                            variant="border"
                            color="cream"
                            size="md"
                        >
                            Add to cart
                            <span className="hidden md:block">
                                <GoArrowRight />
                            </span>
                        </button>
                        <Link
                            to={`/product-details`}
                            className="w-full flex justify-between items-center text-[12px] md:text-[18px] md:p-[30px] bg-dark2 border border-transparent hover:border-cream rounded-[10px] text-cream bg-opacity-100 mb-4 px-4 py-2 md:px-[30px] md:py-[30px]"
                        >
                            Details
                            <span>
                                <GoArrowRight />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* product content */}
            <div className="lg:gap-[5px]">
                <div className="">
                    {/* product title */}
                    <h4 className="text-cream text-[12px] 2xl:text-[18px] font-normal md:font-semibold font-manrope mb-[10px]">
                        <Link to={`/product-details`}>
                            {product?.title.slice(0, 15)}..
                        </Link>
                    </h4>
                    <div className="flex gap-4">
                        {/* current price */}
                        <p className="mb-[10px] text-cream text-[12px] 2xl:text-[16px]">
                            ${product?.currentPrice}
                        </p>
                        {/* old price */}
                        <p className="text-red line-through decoration-cream text-[12px] 2xl:text-[16px]">
                            {product?.oldPrice && `$ ${product?.oldPrice}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {/* product color */}
                    <div className="flex gap-[7px] lg:gap-[10px]">
                        {product?.colors &&
                            product?.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`bg-${color} border border-cream w-[12px] lg:w-[18px] h-[12px] lg:h-[18px] rounded-[5px] cursor-pointer`}
                                ></div>
                            ))}
                    </div>
                    <div>
                        <button className="text-cream text-sm cursor-pointer border border-transparent bg-red px-4 py-2 rounded-sm hover:bg-dark1 hover:border hover:border-cream">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
