import React from "react";
import DOMPurify from "dompurify";
import { useGetTermsConditionsQuery } from "../redux/services/eCommerceApi";

const TermsAndCondition = () => {
    const { data, isLoading, error } = useGetTermsConditionsQuery();

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: Failed to fetch data. Please try again later.</div>;
    }

    // Handle empty or undefined data
    if (!data || data.length === 0) {
        return <div>No content available.</div>;
    }

    return (
        <div className="px-4 lg:px-20   py-24 text-cream">
            {data.map((item, index) => {
                // Sanitize the HTML content
                const sanitizedContent = DOMPurify.sanitize(
                    item?.content || ""
                );
                return (
                    <div
                        className="text-cream"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                );
            })}
        </div>
    );
};

export default TermsAndCondition;
