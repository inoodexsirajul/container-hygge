import React from "react";
import { GoArrowRight } from "react-icons/go";
import Button from "./UI/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetSliderQuery } from "../redux/services/eCommerceApi";

// Skeleton Component
const SliderSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-8 sm:py-12 lg:py-[100px] gap-6 animate-pulse">
        <div className="w-full flex justify-center items-center">
            <div className="bg-gray-300 rounded-lg w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] h-[300px] sm:h-[400px]" />
        </div>
        <div className="w-full text-center lg:text-left px-4 sm:px-6 lg:px-0 space-y-6">
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto lg:mx-0" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full max-w-md mx-auto lg:mx-0" />
                <div className="h-4 bg-gray-300 rounded w-full max-w-md mx-auto lg:mx-0" />
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto lg:mx-0" />
            </div>
            <div className="h-10 bg-gray-300 rounded-full w-40 mx-auto lg:mx-0" />
        </div>
    </div>
);

const Hero = () => {
    const { data: sliderData, isLoading } = useGetSliderQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    if (isLoading) {
        return (
            <div className="px-4 sm:px-6 lg:px-20 xl:px-20 bg-dark1">
                <Swiper spaceBetween={20} slidesPerView={1}>
                    <SwiperSlide>
                        <SliderSkeleton />
                    </SwiperSlide>
                </Swiper>
            </div>
        );
    }

    return (
        <div className="bg-dark1">
            <Swiper spaceBetween={20} slidesPerView={1} className="w-full">
                {sliderData?.sliders?.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 max-w-[1200px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-8 sm:py-12 lg:py-4 2xl:py-10 gap-6">
                                <div className="w-full flex justify-center items-center order-2 lg:order-1">
                                    <img
                                        src={slide.banner && `/${slide.banner}`}
                                        alt={slide.title}
                                        loading="lazy"
                                        className="w-full max-w-[300px] sm:max-w-[400px] lg:w-full lg:max-w-[300px] xl:w-full 2xl:max-w-[400px] object-contain"
                                    />
                                </div>
                                <div className="w-full order-1 lg:order-2 text-center lg:text-left px-4 sm:px-6 lg:px-0">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 3xl:text-6xl text-yellow font-mont  leading-tight sm:leading-snug lg:leading-[1.2] mb-6 sm:mb-8">
                                        {slide?.type}
                                    </h2>
                                    <p className="text-cream text-sm sm:text-base lg:text-lg font-light mb-6  sm:mb-8 max-w-[90%] sm:max-w-[470px] mx-auto lg:mx-0 font-mont">
                                        {slide?.title}
                                    </p>
                                    <Button
                                        href={slide?.btn_url}
                                        className="inline-flex items-center gap-2 text-sm sm:text-base  font-mont lg:text-lg px-6 sm:px-8 py-3 rounded-[10px] text-cream"
                                        variant="border"
                                        color="cream"
                                        size="md"
                                    >
                                        Buy Products
                                        <GoArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
