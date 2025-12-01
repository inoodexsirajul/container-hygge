import React from "react";
import { Link } from "react-router";

const OrderSuccessPage = () => {
    return (
        <div className="min-h-screen bg-dark1 flex items-center justify-center py-12">
            <div className="max-w-md mx-auto bg-dark2 rounded-lg shadow-md p-6 text-center">
                <h1 className="text-3xl font-bold text-cream mb-4">
                    Order Successful!
                </h1>
                <p className="text-gray mb-6">
                    Thank you for your purchase! Your order has been
                    successfully placed. You'll receive a confirmation email
                    with the details soon.
                </p>
                <Link
                    to="/"
                    className="bg-red text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
