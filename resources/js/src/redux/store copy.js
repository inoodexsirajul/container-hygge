// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eCommerceApi } from "./services/eCommerceApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [eCommerceApi.reducerPath], // এটাই সঠিক!
};

const rootReducer = combineReducers({
    [eCommerceApi.reducerPath]: eCommerceApi.reducer,
    // অন্যান্য রিডুসার যদি থাকে
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                ],
            },
        }).concat(eCommerceApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
