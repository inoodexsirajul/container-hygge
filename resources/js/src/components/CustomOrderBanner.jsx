import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";

const CustomOrderBanner = () => {
    return (
        <div className="custom-order-banner  pt-[86px] lg:pt-[150px] 3xl:pt-[266px] pb-[200px] lg:pb-[150px] 3xl:pb-[277px]">
            <div className="px-5 lg:px-20 max-w-[1200px] mx-auto">
                <div className="w-full lg:w-1/2 ml-auto lg:pl-[30px] pb-[100px] lg:pb-0">
                    <h2 className="text-[45px] text-center md:text-left font-mont 2xl:text-[45px] 3xl:text-[60px] text-yellow  leading-[45px] 2xl:leading-[55px] 3xl:leading-20 mb-11 ">
                        “A Personal Touch for Every Occasion”
                    </h2>
                    <div className="max-w-[490px]  ">
                        <p className="text-cream text-center lg:text-left font-mont text-[12px] lg:text-[16px] 3xl:text-[18px] mb-[73px] lg:mb-[107px] font-normal">
                            Add a personal touch to your items. Customize with
                            your favorite design, name, or artwork and carry
                            something that’s truly yours.
                        </p>
                    </div>
                    <div className="flex justify-center lg:justify-start">
                        <Link
                            to="/shop"
                            className="inline-flex justify-center font-mont items-center gap-10 text-[12px] 2xl:text-[16px] 3xl:text-[18px] py-4 px-4 lg:p-5 3xl:p-[30px] bg-red border-0!  rounded-[10px] text-cream"
                        >
                            CUSTOMIZE FOR YOURSELF
                            <span>
                                <GoArrowRight />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomOrderBanner;
