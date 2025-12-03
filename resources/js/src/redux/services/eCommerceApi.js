import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearSessionId, getSessionId, setSessionId } from "../../utils/helper";
import { toast } from "react-toastify";

export const eCommerceApi = createApi({
    reducerPath: "eCommerceApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: import.meta.env.VITE_API_BASE_URL,
        baseUrl: "/api/v1",
        // ||

        credentials: "include", // এটাই ম্যাজিক! কুকি অটো যাবে + আসবে

        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            headers.set("Accept", "application/json");
            return headers;
        },
    }),

    tagTypes: [
        "Cart",
        "Products",
        "ProductDetails",
        "Categories",
        "CategoryProducts", // ← Added
        "ProductsByType",
        "Customization",
        "CartSummary",
        "Checkout",
        "About",
        "Footer",
        "BillingAddress",
        "UserProfile",
        "Sliders",
        "Colors",
        "Sizes",
        "Currency",
    ],

    endpoints: (builder) => ({
        // ==================== AUTH ====================
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),

        signup: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["Cart", "UserProfile", "CartSummary"], // যা যা দরকার
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    localStorage.removeItem("authToken");
                    localStorage.removeItem("pendingVerificationEmail");
                    clearSessionId();
                } catch (err) {
                    toast.error("Logout failed. Please try again.");
                }
            },
        }),

        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: "/update-profile",
                method: "POST",
                body: profileData,
            }),
            invalidatesTags: ["UserProfile"],
        }),

        updatePassword: builder.mutation({
            query: (passData) => ({
                url: "/update-password",
                method: "POST",
                body: passData,
            }),
            invalidatesTags: ["UserProfile"],
        }),

        forgotPassword: builder.mutation({
            query: (passData) => ({
                url: "/forgot-password",
                method: "POST",
                body: passData,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ password, password_confirmation }) => ({
                url: "/reset-password-user",
                method: "POST",
                body: { password, password_confirmation },
            }),
        }),
        // ==================== BILLING ADDRESS ====================
        getCustomerBillingAddresses: builder.query({
            query: () => "/customer-billing-address",
            providesTags: ["BillingAddress"],
            transformResponse: (response) => {
                return response.status === "success" ? response.data : [];
            },
        }),

        // ==================== PUBLIC DATA ====================
        getLogo: builder.query({ query: () => "/home/logo-fav" }),

        getSlider: builder.query({
            query: () => "/home/sliders",
            providesTags: ["Sliders"],
        }),
        getCurrency: builder.query({
            query: () => "/home/site-setting",
            providesTags: ["Currency"],
            keepUnusedDataFor: Infinity,
        }),

        // Removed duplicate getHomeCategory → reuse getCategories
        getHomeCategories: builder.query({
            query: () => "home/categories",
            providesTags: ["Categories"],
        }),

        getAbout: builder.query({
            query: () => "/about",
            providesTags: ["About"],
            keepUnusedDataFor: 600,
        }),

        getTermsConditions: builder.query({
            query: () => "/terms-and-conditions",
            keepUnusedDataFor: 600,
        }),

        getFooter: builder.query({
            query: () => "/footer-info",
            providesTags: ["Footer"],
            keepUnusedDataFor: 3600,
        }),

        getContact: builder.query({
            query: () => "/contact-branch",
            keepUnusedDataFor: 3600,
        }),

        // ==================== USER ====================
        getUserProfile: builder.query({
            query: () => "/user",
            providesTags: ["UserProfile"],
        }),

        // ==================== PRODUCTS ====================

        getProducts: builder.query({
            query: ({
                page = 1,
                min_price,
                max_price,
                sort_by,
                q,
                category_ids,
                brand_ids,
                color_ids,
                size_ids, // ← নতুন প্যারামিটার
            }) => {
                const params = new URLSearchParams();

                params.append("page", page);
                if (min_price) params.append("min_price", min_price);
                if (max_price) params.append("max_price", max_price);
                if (sort_by) params.append("sort_by", sort_by);
                if (q) params.append("q", q);

                if (category_ids && Array.isArray(category_ids)) {
                    category_ids.forEach((id) =>
                        params.append("category_ids[]", id)
                    );
                }
                if (brand_ids && Array.isArray(brand_ids)) {
                    brand_ids.forEach((id) => params.append("brand_ids[]", id));
                }
                if (color_ids && Array.isArray(color_ids)) {
                    color_ids.forEach((id) => params.append("color_ids[]", id));
                }
                if (size_ids && Array.isArray(size_ids)) {
                    // ← নতুন
                    size_ids.forEach((id) => params.append("size_ids[]", id));
                }

                return `/all-products?${params.toString()}`;
            },
            keepUnusedDataFor: 60,
            providesTags: (result) => [
                { type: "Products", id: "LIST" },
                ...(result?.products?.data || []).map((p) => ({
                    type: "Products",
                    id: p.id,
                })),
            ],
        }),

        // ==================== SIZES — নতুন API ====================
        getSizes: builder.query({
            query: () => "/home/sizes",
            transformResponse: (response) => response.data || [],
            providesTags: ["Sizes"],
            keepUnusedDataFor: 3600,
        }),
        getColors: builder.query({
            query: () => "/home/colors",
            transformResponse: (response) => response.data || [],
            providesTags: ["Colors"],
            keepUnusedDataFor: 3600,
        }),

        getBrands: builder.query({
            query: () => "/home/brands",
            transformResponse: (response) => response.brands,
            providesTags: ["Brands"],
            keepUnusedDataFor: 3600,
        }),
        getCategoryProducts: builder.query({
            query: () => `/home/products`,
            providesTags: ["CategoryProducts"],
        }),

        // eCommerceApi.js
        getCategoryHierarchy: builder.query({
            query: (slug) => `/category/${slug}`,

            providesTags: (result, error, slug) => [
                { type: "Category", id: slug },
            ],
        }),

        getSubcategoryHierarchy: builder.query({
            query: (slug) => `/subcategory/${slug}`,

            providesTags: (result, error, slug) => [
                { type: "Subcategory", id: slug },
            ],
        }),

        getChildcategoryHierarchy: builder.query({
            query: (slug) => `/childcategory/${slug}`,

            providesTags: (result, error, slug) => [
                { type: "Childcategory", id: slug },
            ],
        }),

        getProductDetails: builder.query({
            query: (slug) => `/product-detail/${slug}`,
            providesTags: (result, error, slug) => [
                { type: "ProductDetails", id: slug },
            ],
        }),

        addReview: builder.mutation({
            query: (reviewData) => ({
                url: "/review",
                method: "POST",
                body: reviewData,
            }),
            invalidatesTags: (result, error, { product_slug }) => [
                { type: "ProductDetails", id: product_slug },
            ],
        }),

        // ==================== CART ====================
        addToCart: builder.mutation({
            query: (data) => ({
                url: "/cart/add",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),

        getCartDetails: builder.query({
            query: () => "/cart/details",
            providesTags: ["Cart", "CartSummary"],
        }),

        getCartSummery: builder.query({
            query: () => "/cart/summary",
            providesTags: ["Cart"],
        }),

        updateCartQuantity: builder.mutation({
            query: ({ id, quantity }) => ({
                url: "/cart/update",
                method: "POST",
                body: { cart_id: id, quantity },
            }),
            invalidatesTags: ["Cart", "CartSummary"],
        }),

        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/cart/remove/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart", "CartSummary"],
        }),

        resetCart: builder.mutation({
            query: () => ({
                url: "/cart/clear",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        coupon: builder.mutation({
            query: (item) => ({
                url: "/cart/calculate-coupon",
                method: "POST",
                body: item,
            }),
            invalidatesTags: ["Cart"],
        }),

        getUserOrders: builder.query({
            query: () => "/user-orders",
        }),

        // ==================== CHECKOUT ====================
        checkout: builder.query({
            query: () => "/checkout",
            providesTags: ["Checkout"],
        }),

        codPayment: builder.mutation({
            query: (orderData) => ({
                url: "/cod-payment",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Cart", "Checkout"],
        }),

        paypalPayment: builder.mutation({
            query: (orderData) => ({
                url: "/paypal/payment",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Cart", "Checkout"],
        }),

        // ==================== CUSTOMIZATION ====================
        productCustomize: builder.mutation({
            query: (customizationData) => ({
                url: "/product-customize",
                method: "POST",
                body: customizationData,
            }),
            invalidatesTags: ["Cart", "Customization"],
        }),

        // ==================== CATEGORIES & TYPES ====================
        getCategories: builder.query({
            query: () => "/home/categories",
            transformResponse: (response) => response.categories,
            providesTags: ["Categories"],
            keepUnusedDataFor: 3600,
        }),
        // ==================== JOB APPLICATION ====================
        jobApply: builder.mutation({
            query: (formData) => ({
                url: "/job-apply",
                method: "POST",
                body: formData,
            }),
        }),

        getProductsByType: builder.query({
            query: () => "/home/products-by-type",
            transformResponse: (response) => ({
                newArrival: response.new_arrival,
                featuredProduct: response.featured_product,
                topProduct: response.top_product,
                bestProduct: response.best_product,
            }),
            providesTags: ["ProductsByType"],
            keepUnusedDataFor: 600,
        }),

        resendVerificationEmail: builder.mutation({
            query: ({ email }) => ({
                url: "/customers/resend-verification",
                method: "POST",
                body: { email },
            }),
        }),
    }),
});

// ==================== EXPORT ALL HOOKS (Alphabetized) ====================
export const {
    useAddReviewMutation,
    useAddToCartMutation,
    useResendVerificationEmailMutation,
    useCheckoutQuery,
    useCodPaymentMutation,
    useGetColorsQuery,
    useCouponMutation,
    useForgotPasswordMutation,
    useGetBrandsQuery,
    useGetAboutQuery,
    useJobApplyMutation,
    useGetCartDetailsQuery,
    useGetCartSummeryQuery,
    useGetCategoriesQuery,
    useGetCategoryProductsQuery,
    useGetCustomerBillingAddressesQuery,
    useGetHomeCategoriesQuery,
    useGetContactQuery,
    useGetFooterQuery,
    useGetLogoQuery,
    useGetProductDetailsQuery,
    useGetSizesQuery,
    useGetProductsByTypeQuery,
    useGetProductsQuery,
    useGetCategoryHierarchyQuery,
    useGetSubcategoryHierarchyQuery,
    useGetChildcategoryHierarchyQuery,
    useGetSliderQuery,
    useGetTermsConditionsQuery,
    useGetUserOrdersQuery,
    useGetUserProfileQuery,
    useLoginMutation,
    useLogoutMutation,
    usePaypalPaymentMutation,
    useProductCustomizeMutation,
    useRemoveFromCartMutation,
    useResetCartMutation,
    useResetPasswordMutation,
    useSignupMutation,
    useUpdateCartQuantityMutation,
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
    useGetCurrencyQuery,
} = eCommerceApi;
