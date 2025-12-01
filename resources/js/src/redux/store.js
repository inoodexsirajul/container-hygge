// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eCommerceApi } from "./services/eCommerceApi";

// আর কিছু লাগবে না — persist এর কোনো ইম্পোর্ট থাকবে না

const store = configureStore({
    reducer: {
        [eCommerceApi.reducerPath]: eCommerceApi.reducer,
        // যদি অন্য কোনো স্লাইস থাকে তাহলে এখানে যোগ করো
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eCommerceApi.middleware),
});

setupListeners(store.dispatch);

export default store;

// persistor একদম লাগবে না → মুছে ফেলো
// export const persistor = persistStore(store); ← এটা মুছে দাও
