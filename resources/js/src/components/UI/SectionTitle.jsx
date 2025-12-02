import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";

const SectionTitle = ({ smallTitle, title, subtitle, btnUrl }) => {
    return (
        <div className="text-center relative">
            <p className="text-cream font-bold">{smallTitle && smallTitle}</p>
            <h3 className="text-[22px] md:text-3xl 2xl:text-5xl text-yellow font-normal font-mont  mb-[13px] md:mb-2">
                {title}
            </h3>
            <p className="text-cream max-w-[560px] mx-auto text-[14px]  font-mont font-normal">
                {subtitle}
            </p>
            <Link
                to={btnUrl}
                className="text-[14px]   text-cream   font-normal font-mont absolute right-2.5 bottom-0 hidden! xl:inline-flex! items-center gap-4"
            >
                VIEW ALL
                <span>
                    <GoArrowRight />
                </span>
            </Link>
        </div>
    );
};

export default SectionTitle;
