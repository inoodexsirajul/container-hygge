import React from "react";
import { useParams } from "react-router";
import { useGetFooterQuery } from "../redux/services/eCommerceApi";
import DOMPurify from "dompurify";

const FooterPage = () => {
    const { slug } = useParams();
    const { data, isLoading, error } = useGetFooterQuery();

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error || !data) {
        return (
            <div className="text-center py-4 text-red-500">
                Failed to load page.
            </div>
        );
    }

    const page = data.footer_create_page.find((p) => p.slug === slug);

    if (!page) {
        return <div className="text-center py-4">Page not found.</div>;
    }

    const sanitizedDescription = DOMPurify.sanitize(page.description);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
    );
};

export default FooterPage;
