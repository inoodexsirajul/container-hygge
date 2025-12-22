// vite.config.js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.jsx", // আপনার Inertia entry point
            ],
            refresh: false, // ডেভেলপমেন্টে Blade চেঞ্জ হলে রিফ্রেশ হবে
            build: {
                outDir: "../public_html/build", // cPanel-এর জন্য
                emptyOutDir: true,
                manifest: true,
                minify: "esbuild",
                sourcemap: false,
            },
        }),
        react(),
    ],

    base: "/", // cPanel root

    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
