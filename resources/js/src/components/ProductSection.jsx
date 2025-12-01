import React from "react"; // Adjust the import path
import SectionTitle from "./UI/SectionTitle";
import ProductCardTwo from "./ProductCardTwo";
import { useGetProductsByTypeQuery } from "../redux/services/eCommerceApi";

const ProductSection = () => {
    const { data, error, isLoading } = useGetProductsByTypeQuery();

    return (
        <div className="px-[18px] pt-[19px] lg:pt-[125px] pb-[33px] lg:pb-[100px] bg-dark2 lg:px-20">
            <div className="mb-5">
                <SectionTitle
                    title="Go Big. Stay Green"
                    subtitle={`A large eco-friendly and customizable tote designed to fit your essentials and your personality.`}
                    btnUrl="/shop"
                />
            </div>
            <div>
                {/* product card start */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-[40px]">
                        {/* Render 4 skeleton loaders to match the grid layout */}
                        {Array(4)
                            .fill()
                            .map((_, index) => (
                                <div key={index} className="skeleton-card">
                                    <div className="skeleton skeleton-image"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-price"></div>
                                    <div className="skeleton skeleton-description"></div>
                                </div>
                            ))}
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p className="text-red-500 text-center">
                            Error: {error.message}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-[40px]">
                        {data?.newArrival?.map((product) => (
                            <ProductCardTwo
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
                {/* product card end */}
            </div>
        </div>
    );
};

export default ProductSection;
