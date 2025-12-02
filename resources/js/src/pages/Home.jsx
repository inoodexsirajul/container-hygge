import React, { useEffect } from "react";
import Hero from "../components/Hero";
import RecomendedSection from "../components/RecomendedSection";
import EssentialSection from "../components/EssentialSection";
import CustomOrderBanner from "../components/CustomOrderBanner";
import {
    useGetCategoryProductsQuery,
    useGetProductsByTypeQuery,
} from "../redux/services/eCommerceApi";
import CategorySection from "../components/CategorySection";
import FeaturedCategory from "../components/FeaturedCategory";

// Skeleton for Category Section
const CategorySectionSkeleton = () => (
    <div className="py-16 px-6 lg:px-20 bg-cream">
        <div className="max-w-7xl mx-auto">
            {/* Title Skeleton */}
            <div className="mb-12 text-center">
                <div className="h-10 bg-gray-300 rounded-full w-64 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-full w-96 mx-auto mt-4 animate-pulse"></div>
            </div>

            {/* Product Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="group">
                        <div className="aspect-square bg-gray-300 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                            <div className="w-full h-full bg-linear-to-br from-gray-200 via-gray-300 to-gray-400"></div>
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="h-5 bg-gray-300 rounded-full w-32 mx-auto animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-24 mx-auto animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Button Skeleton */}
            <div className="text-center mt-12">
                <div className="inline-block h-12 w-48 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
        </div>
    </div>
);

const Home = () => {
    const { data } = useGetProductsByTypeQuery();
    const { data: categoryProducts, isLoading: categoryLoading } =
        useGetCategoryProductsQuery();

    useEffect(() => {
        // পেজ লোড হলে লোডার বন্ধ
        window.dispatchEvent(new Event("pageloaded"));
    }, []);

    return (
        <>
            <Hero />
            <FeaturedCategory />
            <CustomOrderBanner />

            {/* Recommended & Essential   */}
            {data?.bestProduct?.length > 0 && <RecomendedSection />}

            {/* featured products  */}
            {data?.featuredProduct?.length > 0 && <EssentialSection />}

            {categoryLoading ? (
                <>
                    <CategorySectionSkeleton />

                    {/* <CategorySectionSkeleton /> */}
                </>
            ) : (
                categoryProducts?.homeProducts
                    ?.filter((cat) => cat.products.length > 0)
                    .map((cat, index) => (
                        <CategorySection
                            key={cat.id}
                            categoryId={cat.id}
                            products={cat}
                            index={index}
                            categorySlug={cat.slug}
                        />
                    ))
            )}
        </>
    );
};

export default Home;
