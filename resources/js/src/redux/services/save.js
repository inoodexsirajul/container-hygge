import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eCommerceApi = createApi({
  reducerPath: "eCommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.249:8000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Login: Mutation (POST)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Registration: Mutation (POST)
    signup: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    // get sliders
    getSlider: builder.query({
      query: () => "/home/sliders",
    }),
    getUserProfile: builder.query({
      query: () => "/user",
    }),
    // Products: Query (GET)
    getProducts: builder.query({
      query: ({ page, min_price, max_price, category, sort, q }) => ({
        url: "/all-products",
        params: {
          page,
          min_price,
          max_price,
          category,
          sort,
          q,
        },
      }),
      transformResponse: (response) => response, // Return the full response as-is
    }),
    // Products: Query (GET)
    getProductDetails: builder.query({
      query: (slug) => `/product-detail/${slug}`,
      providesTags: ["ProductDetails"],
    }),
    // New endpoint for adding a review
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["ProductDetails"],
    }),

    // Add to Cart: Mutation (POST)
    addToCart: builder.mutation({
      query: (item) => ({
        url: "cart/add",
        method: "POST",
        body: item, // { productId, quantity }
      }),
      invalidatesTags: ["Cart"], // কার্ট আপডেট হলে রিফেচ ট্রিগার করে
    }),

    // Get Cart: Query (GET, অ্যাড টু কার্টের সাথে লাগবে)
    getCartDetails: builder.query({
      query: () => "cart/details",
      providesTags: ["Cart"], // ক্যাশিং এবং ইনভ্যালিডেশনের জন্য
    }),

    // Update Cart Quantity: Mutation (POST)
    updateCartQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: "/cart/update",
        method: "POST",
        body: { cart_id: id, quantity },
      }),
      invalidatesTags: ["Cart"], // কার্ট আপডেট হলে রিফেচ
    }),

    // Remove from Cart: Mutation (POST)
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/remove/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"], // Ensure this tag is invalidated
    }),
    // Categories: Query (GET)
    getCategories: builder.query({
      query: () => "/home/categories",
      transformResponse: (response) => response.categories,
    }),
    // Products by Type: Query (GET)
    getProductsByType: builder.query({
      query: () => "/home/products-by-type",
      transformResponse: (response) => ({
        newArrival: response.new_arrival,
        featuredProduct: response.featured_product,
        topProduct: response.top_product,
        bestProduct: response.best_product,
      }),
    }),
    // Checkout: Mutation (POST)
    checkout: builder.mutation({
      query: (orderData) => ({
        url: "checkout",
        method: "POST",
        body: orderData, // { cartItems, paymentInfo }
      }),
    }),

    // Products by Type: Query (GET)
    getFooter: builder.query({
      query: () => "/footer-info",
    }),
  }),
});

export const {
  useGetFooterQuery,
  useGetSliderQuery,
  useLoginMutation,
  useSignupMutation,
  useGetUserProfileQuery,
  useGetProductsQuery,
  useGetProductsByTypeQuery,
  useGetProductDetailsQuery,
  useAddReviewMutation,
  useAddToCartMutation,
  useGetCategoriesQuery,
  useGetCartDetailsQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useCheckoutMutation,
} = eCommerceApi;
