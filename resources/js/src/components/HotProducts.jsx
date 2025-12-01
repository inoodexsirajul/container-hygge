import React from "react";
import SectionTitle from "./UI/SectionTitle";
import ProductCardTwo from "./ProductCardTwo";
import { useGetProductsByTypeQuery } from "../redux/services/eCommerceApi";

const HotProducts = () => {
    // Fetch products by type using the RTK Query hook
    const { data, error, isLoading } = useGetProductsByTypeQuery();

    return (
        <div className="px-[18px] pt-[19px] lg:pt-[125px] pb-[33px] lg:pb-[100px] bg-dark1 lg:px-20">
            <div className="mb-5">
                <SectionTitle
                    title="Cool Comfort For Hot Days"
                    subtitle={`Lightweight, breathable, Customizable and effortlessly stylish.`}
                    btnUrl="/shop"
                />
            </div>
            <div>
                {/* product card start */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                        {/* Render 4 skeleton loaders to match the grid layout */}
                        {Array(4)
                            .fill()
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                                >
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-3"></div>
                                    <div className="w-3/5 h-5 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-2/5 h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-600 text-center p-5 rounded-lg">
                        Error: {error.message}
                    </div>
                ) : data?.topProduct?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] lg:gap-[20px]">
                        {data.topProduct.map((product) => (
                            <ProductCardTwo
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No top products available at the moment.
                    </p>
                )}
                {/* product card end */}
            </div>
        </div>
    );
};

export default HotProducts;
