import React from "react";
import { useNavigate } from "react-router";
import { useGetCategoriesQuery } from "../redux/services/eCommerceApi";

const FeaturedCategory = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId, categoryName) => {
        // URL এ category_id + name (SEO friendly)
        navigate(`/shop?category_ids=${categoryId}`);
    };

    if (isLoading) {
        return (
            <div className="px-[18px] pt-[19px] lg:pt-[125px] pb-[33px] lg:pb-[100px] bg-dark2 lg:px-20">
                <p className="text-center text-cream text-xl">
                    Loading Categories...
                </p>
            </div>
        );
    }

    return (
        <div className="px-[18px] pt-[19px] lg:pt-[125px] pb-[33px] lg:pb-[100px] bg-dark2 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-cream text-center mb-12 tracking-wide">
                    Featured Categories
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-8">
                    {data &&
                        data.map((cate) => (
                            <div
                                key={cate?.id}
                                onClick={() =>
                                    handleCategoryClick(cate?.id, cate?.name)
                                }
                                className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-3"
                            >
                                <div className="relative overflow-hidden ">
                                    {/* Image */}
                                    <div className="aspect-square w-full">
                                        <img
                                            src={
                                                cate?.image ||
                                                "/placeholder-category.jpg"
                                            }
                                            alt={cate?.name}
                                            className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src =
                                                    "/placeholder-category.jpg";
                                            }}
                                        />
                                    </div>

                                    {/* Overlay Glow Effect */}
                                    <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Category Name */}
                                <h3 className="text-center mt-4 text-cream font-semibold text-sm md:text-base tracking-wide group-hover:text-red transition-colors duration-300">
                                    {cate?.name}
                                </h3>
                            </div>
                        ))}
                </div>

                {/* Optional: View All Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate("/shop")}
                        className="px-8 py-3 bg-red/20 border-2 border-red/50 text-cream font-bold rounded-full hover:bg-red hover:border-red hover:text-white transition-all duration-300 shadow-lg hover:shadow-red/50"
                    >
                        View All Categories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCategory;
