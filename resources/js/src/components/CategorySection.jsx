import React from "react";
import SectionTitle from "./UI/SectionTitle";
import ProductCardTwo from "./ProductCardTwo";

const CategorySection = ({ categoryId, products, index, categorySlug }) => {
    const bgClass = index % 2 === 0 ? "bg-dark1" : "bg-dark2";
    const dynamicBtnUrl = `/shop/?category_ids[]=${categoryId}`;
    return (
        <div className={` pt-[19px] lg:pt-17 pb-[33px] lg:pb-17 ${bgClass} `}>
            <div className="px-[18px] lg:px-20 max-w-[1200px] mx-auto">
                <div className="mb-5">
                    <SectionTitle
                        title={`${products?.name}`}
                        btnUrl={dynamicBtnUrl}
                    />
                </div>

                <div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5">
                        {products.products.length > 0 &&
                            products.products
                                .slice(0, 6)
                                .map((product) => (
                                    <ProductCardTwo
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
