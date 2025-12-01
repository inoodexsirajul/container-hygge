import React from "react";

const NotFoundDark = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Number with Glow Effect */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-white drop-shadow-lg">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Lost in Space
                    </h2>
                    <p className="text-gray-300 text-lg">
                        The page you're looking for isn't here. It might have
                        been moved or deleted.
                    </p>
                </div>

                {/* Space Illustration */}
                <div className="mb-8">
                    <div className="w-40 h-40 mx-auto relative">
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute inset-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-20 h-20 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 font-medium border border-gray-600"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 font-medium"
                    >
                        Return to Earth
                    </button>
                </div>

                {/* Search Suggestion */}
                <div className="mt-8">
                    <p className="text-gray-400 text-sm">
                        Try searching or check the URL for typos
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundDark;
