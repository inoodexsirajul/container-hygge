 import React from "react";
import { Link, Router } from "react-router";

 const ModalPopup = ({ isOpen, onClose }) => {
     if (!isOpen) return null;

     const handleShopNow=()=>{
        onClose();
        Router.push("/shop")
     }

     return (
         <div className="fixed inset-0 z-50 flex items-center justify-center">
             {/* Backdrop */}
             <div
                 className="absolute inset-0 bg-black/30 bg-opacity-70 animate-fade-in"
                 onClick={onClose}
             />

             {/* Modal Content */}
             <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-modal-pop">
                 {/* Header with Offer Badge */}
                 <div className="bg-linear-to-r from-orange-500 to-red-600 text-white text-center py-4 px-6">
                     <p className="text-sm uppercase tracking-wider font-semibold">
                         Limited Time Offer
                     </p>
                     <h2 className="text-3xl md:text-4xl font-bold mt-2">
                         Buy 5, Get 1{" "}
                         <span className="block text-yellow-300">FREE!</span>
                     </h2>
                 </div>

                 {/* Body */}
                 <div className="p-8 text-center">
                     <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                         Purchase any{" "}
                         <strong className="text-green-600">5 products</strong>{" "}
                         and get the{" "}
                         <strong className="text-green-600">
                             lowest-priced item absolutely FREE
                         </strong>
                         !
                     </p>

                     {/* Visual Highlight */}
                     <div className="flex justify-center items-center gap-4 my-8">
                         <div className="text-5xl">Shopping Cart</div>
                         <div className="text-4xl font-bold text-gray-800">
                             × 5
                         </div>
                         <div className="text-5xl">+</div>
                         <div className="bg-green-100 text-green-700 px-6 py-4 rounded-xl text-2xl font-bold shadow-lg">
                             1 FREE
                         </div>
                     </div>

                     {/* CTA Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <button
                             onClick={handleShopNow}
                             className="px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition shadow-lg"
                         >
                             Shop Now
                         </button>

                         <button
                             onClick={onClose}
                             className="px-8 py-4 text-gray-600 font-medium text-lg underline hover:text-gray-800 transition"
                         >
                             No, thanks
                         </button>
                     </div>

                     {/* Small note */}
                     <p className="text-xs text-gray-500 mt-6">
                         *Offer valid for a limited time only. Terms &
                         conditions apply.
                     </p>
                 </div>

                 {/* Close Button */}
                 <button
                     onClick={onClose}
                     className="absolute top-4 right-4 text-white bg-black bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-opacity-50 transition"
                 >
                     ×
                 </button>
             </div>
         </div>
     );
 };

 export default ModalPopup;