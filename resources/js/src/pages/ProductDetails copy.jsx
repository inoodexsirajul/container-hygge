import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { GoArrowRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import Rating from "react-rating";
import ImageZoom from "react-image-zooom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {
    useAddReviewMutation,
    useGetProductDetailsQuery,
    useAddToCartMutation,
    useGetCartDetailsQuery,
    useRemoveFromCartMutation,
} from "../redux/services/eCommerceApi";

const ProductDetails = () => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);
    const location = useLocation();
    const pathName = location.pathname.split("/")[1];
    const { slug } = useParams();

    const { data, isLoading, error } = useGetProductDetailsQuery(slug);
    const [addReview, { isLoading: isReviewSubmitting, error: reviewError }] =
        useAddReviewMutation();
    const [addToCart, { isLoading: isCartLoading, error: cartError }] =
        useAddToCartMutation();
    // const { refetch } = useGetCartDetailsQuery(undefined, {
    //     skip: !localStorage.getItem("authToken"),
    // });

    const { data: cartData } = useGetCartDetailsQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const navigate = useNavigate();

    // Out of Stock + Max Quantity চেক
    const isOutOfStock = data?.product?.qty <= 0;
    const maxAvailableQty = data?.product?.qty || 0;
    const isMaxReached = quantity >= maxAvailableQty && !isOutOfStock;

    // Calculate total price based on selected color and size
    useEffect(() => {
        if (!data?.product) return;

        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);

        // Default color & size selection
        if (data.product.colors?.length > 0 && !selectedColor) {
            setSelectedColor(data.product.colors[0]);
        }
        if (data.product.sizes?.length > 0 && !selectedSizeId) {
            const validSize = data.product.sizes.find(
                (s) => s.size_id && s.size_name
            );
            if (validSize) setSelectedSizeId(validSize.size_id);
        }

        const regularPrice = Number(data.product.price) || 0;
        const offerPrice =
            data.product.offer_price != null &&
            data.product.offer_price !== "" &&
            !isNaN(Number(data.product.offer_price))
                ? Number(data.product.offer_price)
                : null;

        const isOfferApplied = offerPrice !== null && offerPrice < regularPrice;
        const basePrice = isOfferApplied ? offerPrice : regularPrice;

        const colorExtra = selectedColor?.pivot?.color_price
            ? Number(selectedColor.pivot.color_price)
            : 0;

        const selectedSizeObj = data.product.sizes?.find(
            (s) => s.size_id === selectedSizeId
        );
        const sizeExtra = selectedSizeObj?.pivot?.size_price
            ? Number(selectedSizeObj.pivot.size_price)
            : 0;

        const total = basePrice + colorExtra + sizeExtra;
        setTotalPrice(total > 0 ? total : regularPrice);
    }, [data?.product, selectedColor, selectedSizeId]);

    const handleCustomizeClick = async () => {
        if (!cartData?.data?.cart_items?.length) {
            // কার্ট খালি → সরাসরি কাস্টমাইজ পেজে যাও
            navigate(`/product/${slug}/customize`);
            return;
        }

        // চেক করো এই প্রোডাক্টটা কার্টে আছে কিনা (নরমাল + কাস্টমাইজড দুটোই)
        const existingItem = cartData.data.cart_items.find(
            (item) => item.product_id === data?.product?.id
        );

        if (existingItem) {
            // কার্টে আছে → রিমুভ করো
            try {
                await removeFromCart(existingItem.id).unwrap();
            } catch (err) {
                return; // রিমুভ না হলে এগোবো না
            }
        }

        // এখন কাস্টমাইজ পেজে নিয়ে যাও
        navigate(`/product/${slug}/customize`);
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
        if (isOutOfStock) {
            toast.error("This product is currently out of stock!");
            return;
        }

        if (quantity > maxAvailableQty) {
            toast.error(`Only ${maxAvailableQty} item(s) available in stock!`);
            return;
        }

        if (data?.product?.colors?.length > 0 && !selectedColor) {
            toast.error("Please select a color");
            return;
        }
        if (data?.product?.sizes?.length > 0 && !selectedSizeId) {
            toast.error("Please select a size");
            return;
        }
        if (quantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }
        if (isNaN(totalPrice) || totalPrice <= 0) {
            toast.error("Invalid product price");
            return;
        }

        try {
            await addToCart({
                product_id: data?.product?.id,
                qty: quantity,
                size: selectedSizeId || null,
                color: selectedColor?.color_id || null,
                price: Number(totalPrice),
            }).unwrap();

            toast.success("Product added to cart!");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to add to cart");
        }
    };

    const mainSliderSettings = (hasGallery) => ({
        dots: false,
        infinite: hasGallery,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: nav2,
        fade: hasGallery,
    });

    const thumbnailSliderSettings = (hasGallery) => ({
        dots: false,
        infinite: hasGallery,
        slidesToShow: hasGallery ? 2 : 1,
        slidesToScroll: 1,
        arrows: false,
        vertical: true,
        verticalSwiping: hasGallery,
        swipeToSlide: hasGallery,
        focusOnSelect: hasGallery,
        asNavFor: nav1,
    });

    // Updated: কোয়ান্টিটি স্টকের বেশি যাবে না
    const handleIncrement = () => {
        if (isOutOfStock) return;
        if (quantity >= maxAvailableQty) {
            toast.warn(`Only ${maxAvailableQty} item(s) available in stock`);
            return;
        }
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewRating || !reviewComment.trim()) {
            toast.error("Please provide a rating and comment.");
            return;
        }

        const payload = {
            product_id: data?.product?.id,
            review: reviewComment,
            rating: reviewRating,
        };

        try {
            await addReview(payload).unwrap();
            setReviewRating(0);
            setReviewComment("");
            toast.success("Review submitted successfully!");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to submit review");
        }
    };

    const formatReviewDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return format(date, "MM/dd/yyyy");
        } catch {
            return "Invalid date";
        }
    };

    const renderSkeleton = () => (
        <div className="pt-[5px] grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[50px] 2xl:gap-[156px]">
            {/* তোমার আগের স্কেলিটন কোড (অপরিবর্তিত) */}
            <div className="grid grid-cols-3 gap-2.5 md:gap-5">
                <div>
                    <Skeleton height={276} count={2} className="mb-2" />
                </div>
                <div className="col-span-2 w-full">
                    <Skeleton height={400} />
                </div>
            </div>
            <div className="w-full">
                <Skeleton width="80%" height={40} className="mb-4" />
                <Skeleton count={5} height={20} className="mb-3" />
                <div className="flex gap-4 mt-6">
                    <Skeleton width={200} height={50} count={2} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="px-5 2xl:px-20 py-10 bg-dark2">
            {isLoading && renderSkeleton()}
            {error && (
                <p className="text-red-500 text-center">
                    Error:{" "}
                    {error?.data?.message || "Failed to load product details"}
                </p>
            )}

            {!isLoading && !error && data?.product && (
                <div className="pt-[5px] grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[50px] 2xl:gap-[156px]">
                    {/* Left side: Image Sliders */}
                    <div className="grid grid-cols-3 gap-2.5 md:gap-5">
                        <div>
                            <Slider
                                {...thumbnailSliderSettings(
                                    data?.product?.product_image_galleries
                                        ?.length > 0
                                )}
                                ref={sliderRef2}
                            >
                                {data?.product?.product_image_galleries
                                    ?.length > 0 ? (
                                    data?.product?.product_image_galleries?.map(
                                        (img, index) => (
                                            <div
                                                key={`thumb-${index}`}
                                                className="xl:h-full"
                                            >
                                                <img
                                                    src={`/${img?.image}`}
                                                    alt={`thumbnail-${index}`}
                                                    className="w-full xl:h-[276px] object-cover cursor-pointer rounded"
                                                />
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div
                                        key="thumb-single"
                                        className="xl:h-full"
                                    >
                                        <img
                                            src={`/${data?.product?.thumb_image}`}
                                            alt="thumbnail"
                                            className="w-full xl:h-[276px] object-cover rounded"
                                        />
                                    </div>
                                )}
                            </Slider>
                        </div>
                        <div className="col-span-2 w-full">
                            <Slider
                                {...mainSliderSettings(
                                    data?.product?.product_image_galleries
                                        ?.length > 0
                                )}
                                ref={sliderRef1}
                            >
                                {data?.product?.product_image_galleries
                                    ?.length > 0 ? (
                                    data?.product?.product_image_galleries?.map(
                                        (img, index) => (
                                            <div
                                                key={`main-${index}`}
                                                className="w-full h-full"
                                            >
                                                <ImageZoom
                                                    src={`/${img?.image}`}
                                                    className="w-full h-full rounded-xl"
                                                    alt="Product image"
                                                    zoom="200"
                                                />
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div
                                        key="main-single"
                                        className="w-full h-full"
                                    >
                                        <ImageZoom
                                            src={`/${data?.product?.thumb_image}`}
                                            className="w-full h-full rounded-xl"
                                            alt="Product image"
                                            zoom="200"
                                        />
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </div>

                    {/* Right side: Product Info */}
                    <div className="w-full">
                        <div className="pt-[15px] mb-4 3xl:mb-[38px]">
                            <ul className="flex items-center gap-3">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-cream text-sm md:text-[18px] font-normal"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="text-cream text-sm md:text-[18px] font-normal">
                                    /
                                </li>
                                <li className="text-cream text-[14px] md:text-[18px] font-normal capitalize">
                                    {pathName}
                                </li>
                            </ul>
                        </div>
                        <h2 className="text-yellow text-[35px] xl:text-[46px] font-normal mb-3">
                            {data?.product?.name || "Unknown Product"}
                        </h2>
                        <div className="mb-4 3xl:mb-[30px]">
                            <Rating
                                initialRating={
                                    data?.product?.reviews_avg_rating || 0
                                }
                                emptySymbol={
                                    <MdOutlineStarBorder className="text-red text-[24px]" />
                                }
                                fullSymbol={
                                    <MdOutlineStar className="text-red text-[24px]" />
                                }
                                readonly
                            />
                        </div>
                        <div className="flex gap-[30px] xl:gap-[60px] items-center mb-4 3xl:mb-[30px]">
                            <p className="text-[16px] xl:text-[24px] text-cream font-bold">
                                ${totalPrice}
                            </p>
                            {data?.product?.offer_price != null &&
                                data?.product?.offer_price !== "" &&
                                Number(data.product.offer_price) <
                                    Number(data.product.price) && (
                                    <p className="text-[16px] xl:text-[24px] text-gray-500 line-through">
                                        ${Number(data.product.price)}
                                    </p>
                                )}
                        </div>
                        <p className="text-[16px] 3xl:text-[18px] text-cream mb-4 3xl:mb-[50px]">
                            {data?.product?.short_description ||
                                "No description available"}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 xl:gap-[46px] mb-[59px]">
                            <div className="flex gap-4 xl:gap-[33px] items-center">
                                <span className="text-[18px] text-cream bg-dark1 p-1 rounded-[5px] font-bold">
                                    Collection
                                </span>
                                <span className="text-cream font-normal">
                                    {data?.product?.category?.name || "Unknown"}
                                </span>
                            </div>
                            <div className="flex gap-4 xl:gap-[33px] items-center">
                                <span className="text-[18px] text-cream bg-dark1 p-1 rounded-[5px] font-bold">
                                    Stock
                                </span>
                                <span className="text-cream font-normal">
                                    {isOutOfStock ? (
                                        <span className="text-red text-xl font-bold">
                                            Out of Stock
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-yellow">
                                                {maxAvailableQty}
                                            </span>{" "}
                                            In Stock
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 xl:gap-10 3xl:gap-20 mb-[60px]">
                            {/* Colors */}
                            <div className="w-full">
                                <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0">
                                    Colors
                                </h5>
                                {data?.product?.colors?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 xl:gap-[18px]">
                                        {data.product.colors.map((color) => (
                                            <div
                                                key={color.color_id}
                                                className="flex items-center gap-2 relative"
                                            >
                                                <button
                                                    type="button"
                                                    disabled={isOutOfStock}
                                                    className={`w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] rounded-[10px] border cursor-pointer transition-all duration-200 ${
                                                        selectedColor?.color_id ===
                                                        color.color_id
                                                            ? "border-4 border-yellow scale-110 shadow-md"
                                                            : "border-2 border-gray-800 hover:border-gray-500"
                                                    } ${
                                                        isOutOfStock
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        backgroundColor:
                                                            color.color_code,
                                                    }}
                                                    onClick={() =>
                                                        !isOutOfStock &&
                                                        setSelectedColor(color)
                                                    }
                                                >
                                                    {selectedColor?.color_id ===
                                                        color.color_id && (
                                                        <FaCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cream text-[12px] xl:text-[16px] drop-shadow" />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray text-[16px]">
                                        No colors available
                                    </p>
                                )}
                            </div>

                            {/* Quantity - এখানে লিমিট যোগ করা হয়েছে */}
                            <div className="w-full">
                                <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0">
                                    Quantity
                                </h5>
                                <div className="flex gap-2 xl:gap-[18px]">
                                    <button
                                        type="button"
                                        disabled={isOutOfStock || quantity <= 1}
                                        className={`cursor-pointer w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] border border-gray rounded-[10px] text-cream flex justify-center items-center transition-all ${
                                            isOutOfStock || quantity <= 1
                                                ? "opacity-60 cursor-not-allowed"
                                                : "hover:bg-gray-700"
                                        }`}
                                        onClick={handleDecrement}
                                    >
                                        <HiOutlineMinusSm />
                                    </button>

                                    <div className="w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] border border-gray rounded-[10px] text-cream flex justify-center items-center">
                                        {quantity}
                                    </div>

                                    <button
                                        type="button"
                                        disabled={isOutOfStock || isMaxReached}
                                        className={`cursor-pointer w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] border border-gray rounded-[10px] text-cream flex justify-center items-center transition-all ${
                                            isOutOfStock || isMaxReached
                                                ? "opacity-60 cursor-not-allowed"
                                                : "hover:bg-gray-700"
                                        }`}
                                        onClick={handleIncrement}
                                    >
                                        <HiOutlinePlusSm />
                                    </button>
                                </div>

                                {isMaxReached && (
                                    <p className="text-yellow text-xs mt-2 font-medium">
                                        Maximum available quantity reached
                                    </p>
                                )}
                            </div>

                            {/* Sizes */}
                            <div className="w-full">
                                <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0">
                                    Sizes
                                </h5>
                                {data?.product?.sizes?.length > 0 ? (
                                    <div className="flex flex-wrap gap-[18px]">
                                        {data.product?.sizes.map((size) => (
                                            <button
                                                type="button"
                                                key={size.size_id}
                                                disabled={isOutOfStock}
                                                className={`relative w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] rounded-[10px] flex justify-center items-center font-bold text-sm xl:text-[14px] transition-all duration-200 ${
                                                    selectedSizeId ===
                                                    size.size_id
                                                        ? "bg-yellow text-dark2 border-2 border-yellow shadow-md scale-105"
                                                        : "border-2 border-gray-800 text-cream hover:bg-gray-700"
                                                } ${
                                                    isOutOfStock
                                                        ? "opacity-60 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    !isOutOfStock &&
                                                    setSelectedSizeId(
                                                        size.size_id
                                                    )
                                                }
                                            >
                                                {size.size_name.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray text-[16px]">
                                        No sizes available
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-[47px]">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={
                                    isCartLoading ||
                                    isOutOfStock ||
                                    quantity > maxAvailableQty
                                }
                                className={`flex items-center gap-2.5 font-semibold text-[16px] xl:text-[18px] text-cream rounded-[10px] py-2.5 xl:py-[30px] px-[30px] xl:px-[60px] cursor-pointer transition-all ${
                                    isOutOfStock || quantity > maxAvailableQty
                                        ? "bg-gray-600 opacity-70 cursor-not-allowed"
                                        : isCartLoading
                                        ? "bg-gray-500 opacity-70 cursor-not-allowed"
                                        : "bg-red hover:bg-red-700"
                                }`}
                            >
                                {isOutOfStock
                                    ? "Out of Stock"
                                    : quantity > maxAvailableQty
                                    ? "Exceeds Stock"
                                    : isCartLoading
                                    ? "Adding..."
                                    : "Add to cart"}
                                {!isOutOfStock &&
                                    quantity <= maxAvailableQty && (
                                        <GoArrowRight />
                                    )}
                            </button>

                            {data?.product?.customization && !isOutOfStock && (
                                <button
                                    onClick={handleCustomizeClick} // ← এখানে Link এর বদলে button + onClick
                                    className="flex items-center gap-2.5 font-semibold text-[18px] text-cream border border-cream rounded-[10px] py-2.5 xl:py-[30px] px-[30px] xl:px-[60px] cursor-pointer hover:bg-cream hover:text-dark2 transition-all"
                                >
                                    Customize <GoArrowRight />
                                </button>
                            )}
                        </div>

                        {cartError && (
                            <p className="text-red-500 text-[16px] mt-4">
                                Error:{" "}
                                {cartError?.data?.message ||
                                    "Failed to add to cart"}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Product Tabs - অপরিবর্তিত */}
            {/* Product Tabs */}
            {!isLoading && !error && (
                <div className="pt-[129px] pb-[60px]">
                    <Tabs>
                        <div className="text-center border-b border-b-gray/20">
                            <TabList className="flex flex-col md:flex-row justify-start md:justify-center md:gap-[100px] xl:gap-[178px]">
                                <Tab className="ml-8 text-cream text-md text-left md:text-auto xl:text-[24px] font-normal pb-4 md:pb-10 cursor-pointer focus:border-0 transition-all duration-300">
                                    PRODUCT REVIEW
                                </Tab>
                                <Tab className="ml-8 text-cream text-md text-left md:text-auto xl:text-[24px] font-normal pb-4 md:pb-10 cursor-pointer focus:border-0 transition-all duration-300">
                                    FULL DESCRIPTION
                                </Tab>
                            </TabList>
                        </div>

                        {/* product review tab  */}
                        <TabPanel className="text-cream">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-20">
                                <div>
                                    {data?.reviews?.length > 0 ? (
                                        data.reviews.map((review) => (
                                            <div
                                                key={review?.id}
                                                className="flex gap-4 3xl:gap-[43px] pr-0 lg:pr-[50px] 3xl:pr-[221px] mb-[30px] xl:mb-20"
                                            >
                                                <div className="w-11">
                                                    <img
                                                        src={`/${review?.user?.image}`}
                                                        alt={`${
                                                            review?.user
                                                                ?.name ||
                                                            "Anonymous"
                                                        }'s avatar`}
                                                        className="w-11 h-11 rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col xl:flex-row justify-between flex-wrap xl:items-center mb-4 xl:mb-[37px]">
                                                        <h4 className="text-[24px] font-bold text-cream">
                                                            {review?.user
                                                                ?.name ||
                                                                "Anonymous"}
                                                        </h4>
                                                        <div className="flex items-center gap-4">
                                                            <Rating
                                                                initialRating={
                                                                    review?.rating ||
                                                                    0
                                                                }
                                                                emptySymbol={
                                                                    <MdOutlineStarBorder className="text-red text-[18px]" />
                                                                }
                                                                fullSymbol={
                                                                    <MdOutlineStar className="text-red text-[18px]" />
                                                                }
                                                                readonly
                                                            />
                                                            <p className="text-gray text-sm xl:text-[18px]">
                                                                {formatReviewDate(
                                                                    review?.created_at
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="pr-0 xl:pr-[100px]">
                                                        <p className="text-gray text-sm xl:text-[18px] font-normal">
                                                            {review?.comment ||
                                                                "No comment provided"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray text-[18px]">
                                            No reviews yet
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-[24px] font-normal text-cream mb-[18px]">
                                        Write a review
                                    </h4>
                                    <form>
                                        <div className="mb-[25px]">
                                            <Rating
                                                initialRating={reviewRating}
                                                emptySymbol={
                                                    <MdOutlineStarBorder className="text-red text-[24px]" />
                                                }
                                                fullSymbol={
                                                    <MdOutlineStar className="text-red text-[24px]" />
                                                }
                                                onChange={(value) =>
                                                    setReviewRating(value)
                                                }
                                            />
                                        </div>
                                        <textarea
                                            value={reviewComment}
                                            onChange={(e) =>
                                                setReviewComment(e.target.value)
                                            }
                                            className="w-full bg-dark1 border-0 focus:border-0 focus:outline-0 p-4 h-[200px] text-cream text-[18px]"
                                            placeholder="Write your comment here"
                                            aria-label="Review comment"
                                        ></textarea>
                                        {reviewError && (
                                            <p className="text-red-500 text-[18px] mt-2">
                                                Error:{" "}
                                                {reviewError?.data?.message ||
                                                    "Failed to submit review"}
                                            </p>
                                        )}
                                        <p className="text-gray text-[18px] mt-2">
                                            How we use your data: We'll only
                                            contact you about the review you
                                            left, and only if necessary. By
                                            submitting your review, you agree to
                                            Judge.me's terms, privacy, and
                                            content policies.
                                        </p>
                                        <button
                                            type="submit"
                                            onClick={handleReviewSubmit}
                                            className="flex items-center gap-2 py-[30px] px-[60px] border border-cream mt-9 rounded-[10px] cursor-pointer text-cream text-[18px] font-semibold hover:bg-cream hover:text-dark2 transition-all"
                                            disabled={isReviewSubmitting}
                                        >
                                            {isReviewSubmitting
                                                ? "Submitting..."
                                                : "SUBMIT REVIEW"}
                                            <GoArrowRight />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </TabPanel>
                        {/* full description tab  */}
                        <TabPanel className="text-cream">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="w-full flex justify-center pt-8">
                                    <img
                                        src={`/${data?.product?.thumb_image}`}
                                        alt={data?.product?.name}
                                    />
                                </div>
                                <div className="pt-20">
                                    <h4 className="text-[24px] font-bold text-cream mb-8">
                                        {data?.product?.name ||
                                            "Unknown Product"}
                                    </h4>
                                    <div className="max-w-md">
                                        <p
                                            className="text-sm xl:text-[18px] text-gray font-normal mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    data?.product
                                                        ?.long_description ||
                                                    "No description available",
                                            }}
                                        />
                                    </div>
                                    {/* <table className="mt-[72px]">
                                        <tbody>
                                            <tr>
                                                <th className="text-left py-2 text-cream">
                                                    Material
                                                </th>
                                                <td className="p-2 text-cream">
                                                    {data?.product?.material ||
                                                        "100% Cotton"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 text-cream">
                                                    Brand
                                                </th>
                                                <td className="p-2 text-cream">
                                                    {data?.product?.brand ||
                                                        "Hygee"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 text-cream">
                                                    Color
                                                </th>
                                                <td className="p-2 text-cream">
                                                    {selectedColor?.color_name ||
                                                        "Not selected"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 text-cream">
                                                    Size
                                                </th>
                                                <td className="p-2 text-cream">
                                                    {data?.product?.sizes
                                                        ?.find(
                                                            (size) =>
                                                                size.size_id ===
                                                                selectedSizeId
                                                        )
                                                        ?.size_name?.toUpperCase() ||
                                                        "Not selected"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="text-left py-2 text-cream">
                                                    Origin
                                                </th>
                                                <td className="p-2 text-cream">
                                                    {data?.product?.origin ||
                                                        "Denmark"}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
