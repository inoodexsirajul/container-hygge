import React, { useEffect, useRef, useState, useMemo } from "react";
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
    useGetCurrencyQuery,
} from "../redux/services/eCommerceApi";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const location = useLocation();
    const pathName = location.pathname.split("/")[1];
    const { slug } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetProductDetailsQuery(slug);
    const [addReview, { isLoading: isReviewSubmitting, error: reviewError }] =
        useAddReviewMutation();
    const { data: currency } = useGetCurrencyQuery();
    const [addToCart, { isLoading: isCartLoading, error: cartError }] =
        useAddToCartMutation();
    const { data: cartData } = useGetCartDetailsQuery();
    const [removeFromCart] = useRemoveFromCartMutation();

    const product = data?.product;
    const galleries = product?.product_image_galleries || [];

    const galleryColors = useMemo(() => {
        const map = new Map();
        galleries.forEach((item) => {
            if (item.color?.id) {
                map.set(item.color.id, item.color);
            }
        });
        return Array.from(map.values());
    }, [galleries]);

    const isOutOfStock = product?.qty <= 0;
    const maxAvailableQty = product?.qty || 0;
    const isMaxReached = quantity >= maxAvailableQty && !isOutOfStock;

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, [galleryColors]);

    useEffect(() => {
        if (!selectedColor || !slider1.current) return;

        const index = galleries.findIndex(
            (img) => img.color?.id === selectedColor.id
        );
        if (index !== -1) {
            slider1.current.slickGoTo(index);
        }
    }, [selectedColor, galleries]);

    useEffect(() => {
        if (!product) return;

        let sizeExtra = 0;
        if (selectedSizeId && product.sizes?.length > 0) {
            const selectedSize = product.sizes.find(
                (s) => s.size_id === selectedSizeId
            );
            if (selectedSize?.pivot?.size_price) {
                sizeExtra = Number(selectedSize.pivot.size_price);
            }
        }

        const basePrice = Number(product.price) || 0;
        const offerPrice =
            product.offer_price && !isNaN(Number(product.offer_price))
                ? Number(product.offer_price)
                : null;

        if (offerPrice !== null) {
            setTotalPrice(offerPrice + sizeExtra);
        } else {
            setTotalPrice(basePrice + sizeExtra);
        }
    }, [product, selectedSizeId]);

    const handleAddToCart = async () => {
        if (isOutOfStock)
            return toast.error("This product is currently out of stock!");
        if (quantity > maxAvailableQty)
            return toast.error(
                `Only ${maxAvailableQty} item(s) available in stock!`
            );
        if (galleryColors.length > 0 && !selectedColor)
            return toast.error("Please select a color");
        if (product?.sizes?.length > 0 && !selectedSizeId)
            return toast.error("Please select a size");

        try {
            await addToCart({
                product_id: product.id,
                qty: quantity,
                size: selectedSizeId || null,
                color: selectedColor?.id || null,
                price: Number(totalPrice),
            }).unwrap();
            toast.success("Product added to cart!");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to add to cart");
        }
    };

    const handleCustomizeClick = async () => {
        if (cartData?.data?.cart_items?.length) {
            const existingItem = cartData.data.cart_items.find(
                (item) => item.product_id === product?.id
            );
            if (existingItem) {
                try {
                    await removeFromCart(existingItem.id).unwrap();
                } catch {}
            }
        }
        navigate(`/product/${slug}/customize`);
    };

    const handleIncrement = () => {
        if (isOutOfStock || quantity >= maxAvailableQty) {
            toast.warn(`Only ${maxAvailableQty} item(s) available`);
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
        try {
            await addReview({
                product_id: product.id,
                review: reviewComment,
                rating: reviewRating,
            }).unwrap();
            setReviewRating(0);
            setReviewComment("");
            toast.success("Review submitted successfully!");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to submit review");
        }
    };

    const formatReviewDate = (dateString) => {
        try {
            return format(new Date(dateString), "MM/dd/yyyy");
        } catch {
            return "Invalid date";
        }
    };
    useEffect(() => {
        // পেজ লোড হলে লোডার বন্ধ
        window.dispatchEvent(new Event("pageloaded"));
    }, []);

    const renderSkeleton = () => (
        <div className="pt-[5px] grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[50px] 2xl:gap-[156px]">
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
        <div className="bg-dark2">
            <div className="px-5 2xl:px-20 py-10 max-w-[1200px] mx-auto">
                {isLoading && renderSkeleton()}
                {error && (
                    <p className="text-red-500 text-center">
                        Error:{" "}
                        {error?.data?.message ||
                            "Failed to load product details"}
                    </p>
                )}

                {!isLoading && !error && product && (
                    <div className="pt-[5px] grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-[50px] 2xl:gap-[30px]">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-3 gap-2.5 md:gap-5">
                            {/* Thumbnails - এখন স্লাইড + ক্লিক + সিঙ্ক করবে */}
                            <div className="overflow-hidden">
                                <Slider
                                    ref={slider2}
                                    asNavFor={nav1}
                                    slidesToShow={2}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    vertical={true}
                                    verticalSwiping={true}
                                    arrows={false}
                                    infinite={galleries.length > 2}
                                    className="thumbnail-slider"
                                >
                                    {galleries.length > 0 ? (
                                        galleries.map((img, i) => (
                                            <div
                                                key={`thumb-${i}`}
                                                className="px-2 py-2 cursor-pointer outline-none"
                                            >
                                                <img
                                                    src={`/${img.image}`}
                                                    alt={`thumb ${i}`}
                                                    className={`w-full h-[140px] xl:h-[200px] object-cover rounded-lg border-2 transition-all duration-300
                           `}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-2 py-3">
                                            <img
                                                src={`/${product.thumb_image}`}
                                                alt="thumb"
                                                className="w-full h-[200px] object-cover rounded-lg border-2 border-gray-700"
                                            />
                                        </div>
                                    )}
                                </Slider>
                            </div>

                            {/* Main Slider */}
                            <div className="col-span-2 w-full">
                                <Slider
                                    ref={slider1}
                                    asNavFor={nav2}
                                    arrows={false}
                                    fade={true}
                                    dots={false}
                                    infinite={galleries.length > 1}
                                >
                                    {galleries.length > 0 ? (
                                        galleries.map((img, i) => (
                                            <div
                                                key={`main-${i}`}
                                                className="w-full h-full"
                                            >
                                                <ImageZoom
                                                    src={`/${img.image}`}
                                                    zoom="200"
                                                    className="w-full  h-auto object-cover rounded-xl"
                                                    alt={`${product.name} - ${
                                                        img.color?.color_name ||
                                                        "Product"
                                                    }`}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full h-full">
                                            <ImageZoom
                                                src={`/${product.thumb_image}`}
                                                zoom="200"
                                                className="w-full h-auto object-cover rounded-xl"
                                                alt={product.name}
                                            />
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        </div>

                        {/* Product Info - ডিজাইন ১০০% অপরিবর্তিত */}
                        <div className="w-full">
                            <div className="pt-[15px] mb-4 3xl:mb-3">
                                <ul className="flex items-center gap-3">
                                    <li>
                                        <Link
                                            to="/"
                                            className="text-cream text-sm font-normal font-mont"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="text-cream text-sm   font-normal">
                                        /
                                    </li>
                                    <li className="text-cream  text-sm font-normal capitalize font-mont">
                                        {pathName}
                                    </li>
                                </ul>
                            </div>

                            <h2 className="text-yellow text-2xl font-medium mb-3 font-mont">
                                {product.name}
                            </h2>

                            <div className="mb-4 2xl:mb-4">
                                <Rating
                                    initialRating={
                                        product.reviews_avg_rating || 0
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

                            <div className="flex gap-[30px] xl:gap-[60px] items-center mb-4">
                                {/*  totalPrice */}
                                <p className="text-xl text-cream font-bold font-mont">
                                    {currency?.settings?.currency_icon}
                                    {totalPrice}
                                </p>

                                {/* line through */}
                                {product.offer_price &&
                                    !isNaN(Number(product.offer_price)) && (
                                        <p className="text-xl text-gray-500 line-through font-mont">
                                            {currency?.settings?.currency_icon}
                                            {Number(product.price)}
                                        </p>
                                    )}
                            </div>

                            <p className="text-sm text-cream mb-4   font-mont">
                                {product.short_description}
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 xl:gap-[46px] mb-8">
                                <div className="flex gap-4 xl:gap-[33px] items-center">
                                    <span className="text-[18px] text-cream bg-dark1 p-1 rounded-[5px] font-bold font-mont">
                                        Collection
                                    </span>
                                    <span className="text-cream font-normal font-mont">
                                        {product.category?.name || "Unknown"}
                                    </span>
                                </div>
                                <div className="flex gap-4 xl:gap-[33px] items-center">
                                    <span className="text-[18px] text-cream bg-dark1 p-1 rounded-[5px] font-bold font-mont">
                                        Stock
                                    </span>
                                    <span className="text-cream font-normal font-mont">
                                        {isOutOfStock ? (
                                            <span className="text-red text-xl font-bold font-mont">
                                                Out of Stock
                                            </span>
                                        ) : (
                                            <>
                                                <span className="text-yellow font-mont">
                                                    {maxAvailableQty}
                                                </span>{" "}
                                                In Stock
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                            {/* colors  */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 xl:gap-8 mb-[60px]">
                                {/* Colors  */}
                                <div className="w-full">
                                    <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0 font-mont">
                                        Colors
                                    </h5>
                                    {galleryColors.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 xl:gap-2  ">
                                            {galleryColors.map((color) => (
                                                <div
                                                    key={color.id}
                                                    className="relative  "
                                                >
                                                    <button
                                                        type="button"
                                                        disabled={isOutOfStock}
                                                        onClick={() =>
                                                            !isOutOfStock &&
                                                            setSelectedColor(
                                                                color
                                                            )
                                                        }
                                                        className={`
                                                        w-[30px] xl:w-[35px] h-[30px] xl:h-[35px] 
                                                        rounded-[10px] border transition-all duration-200 font-mont
                                                        ${
                                                            selectedColor?.id ===
                                                            color.id
                                                                ? "border-4 border-cream scale-110  "
                                                                : "border-2 border-gray-800 hover:border-gray-500"
                                                        }
                                                        ${
                                                            isOutOfStock
                                                                ? "opacity-60 cursor-not-allowed"
                                                                : "cursor-pointer"
                                                        }
                                                    `}
                                                        style={{
                                                            backgroundColor:
                                                                color.color_code,
                                                        }}
                                                    >
                                                        {selectedColor?.id ===
                                                            color.id && (
                                                            <FaCheck className="absolute inset-0 m-auto text-cream text-[14px] drop-shadow-lg" />
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray text-[16px] font-mont">
                                            No colors available
                                        </p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="w-full">
                                    <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0 font-mont">
                                        Quantity
                                    </h5>
                                    <div className="flex gap-2 xl:gap-[18px]">
                                        <button
                                            type="button"
                                            disabled={
                                                isOutOfStock || quantity <= 1
                                            }
                                            className={`cursor-pointer w-[30px] font-mont xl:w-[45px] h-[30px] xl:h-[45px] border border-gray rounded-[10px] text-cream flex justify-center items-center transition-all ${
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
                                            disabled={
                                                isOutOfStock || isMaxReached
                                            }
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
                                        <p className="text-yellow text-xs mt-2 font-medium font-mont">
                                            Maximum available quantity reached
                                        </p>
                                    )}
                                </div>

                                {/* Sizes */}
                                <div className="w-full">
                                    <h5 className="font-manrope text-[18px] text-cream font-bold mb-[21px] leading-0 font-mont">
                                        Sizes
                                    </h5>
                                    {product.sizes?.length > 0 ? (
                                        <div className="flex flex-wrap gap-[18px]">
                                            {product.sizes.map((size) => (
                                                <button
                                                    type="button"
                                                    key={size.size_id}
                                                    disabled={isOutOfStock}
                                                    onClick={() =>
                                                        !isOutOfStock &&
                                                        setSelectedSizeId(
                                                            size.size_id
                                                        )
                                                    }
                                                    className={`relative font-mont w-[30px] xl:w-[45px] h-[30px] xl:h-[45px] rounded-[7px] flex justify-center items-center font-bold text-sm xl:text-[14px] transition-all duration-200 ${
                                                        selectedSizeId ===
                                                        size.size_id
                                                            ? "bg-yellow text-dark2 border-2 border-yellow shadow-md scale-105"
                                                            : "border-2 border-gray text-cream hover:bg-gray-700"
                                                    } ${
                                                        isOutOfStock
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                >
                                                    {size.size_name.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray text-[16px] font-mont">
                                            No sizes available
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* product quantity         */}
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-[47px]">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={
                                        isCartLoading ||
                                        isOutOfStock ||
                                        quantity > maxAvailableQty
                                    }
                                    className={`flex items-center gap-2.5 font-medium text-[16px] font-mont xl:text-sm text-cream text-center rounded-[10px] py-2 xl:py-2 px-8 cursor-pointer transition-all ${
                                        isOutOfStock ||
                                        quantity > maxAvailableQty
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

                                {product.customization && !isOutOfStock && (
                                    <button
                                        onClick={handleCustomizeClick}
                                        className="flex items-center font-mont gap-2.5 font-medium text-sm text-cream border border-cream rounded-[10px] py-2.5 xl:py-4 px-[30px] xl:px-4 cursor-pointer hover:bg-cream hover:text-dark2 transition-all"
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

                {/* Product Tabs */}
                {!isLoading && !error && (
                    <div className="pt-[129px] pb-[60px]">
                        <Tabs>
                            <div className="text-center border-b border-b-gray/20">
                                <TabList className="flex flex-col md:flex-row justify-start md:justify-center md:gap-[100px] xl:gap-[178px]">
                                    <Tab className="ml-8 font-mont text-cream text-md text-left md:text-auto xl:text-[24px] font-normal pb-4 md:pb-10 cursor-pointer focus:border-0 transition-all duration-300">
                                        PRODUCT REVIEW
                                    </Tab>
                                    <Tab className="ml-8 font-mont text-cream text-md text-left md:text-auto xl:text-[24px] font-normal pb-4 md:pb-10 cursor-pointer focus:border-0 transition-all duration-300">
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
                                                            <h4 className="text-[24px] font-bold text-cream font-mont">
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
                                                            <p className="text-gray text-sm xl:text-[18px] font-normal font-mont">
                                                                {review?.comment ||
                                                                    "No comment provided"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray text-[18px] font-mont">
                                                No reviews yet
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-[24px] font-normal text-cream mb-[18px] font-mont">
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
                                                    setReviewComment(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-dark1 border-0 focus:border-0 focus:outline-0 p-4 h-[200px] text-cream text-[18px]"
                                                placeholder="Write your comment here"
                                                aria-label="Review comment"
                                            ></textarea>
                                            {reviewError && (
                                                <p className="text-red-500 text-[18px] mt-2">
                                                    Error:{" "}
                                                    {reviewError?.data
                                                        ?.message ||
                                                        "Failed to submit review"}
                                                </p>
                                            )}
                                            <p className="text-gray text-[18px] mt-2 font-mont">
                                                How we use your data: We'll only
                                                contact you about the review you
                                                left, and only if necessary. By
                                                submitting your review, you
                                                agree to Judge.me's terms,
                                                privacy, and content policies.
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
                                        <h4 className="text-[24px] font-bold text-cream mb-8 font-mont">
                                            {data?.product?.name ||
                                                "Unknown Product"}
                                        </h4>
                                        <div className="max-w-md">
                                            <p
                                                className="text-sm xl:text-[18px] text-gray font-normal mb-4 font-mont"
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
        </div>
    );
};

export default ProductDetails;
