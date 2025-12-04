import React, { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    useGetProductDetailsQuery,
    useProductCustomizeMutation,
    useAddToCartMutation,
    useGetCartDetailsQuery,
    eCommerceApi,
    useRemoveFromCartMutation,
} from "../redux/services/eCommerceApi";
import { useParams, useNavigate, useLocation } from "react-router";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "90vw",
        maxHeight: "90vh",
        zIndex: 1001,
        overflowY: "auto",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 999,
    },
};

const DraggableResizableText = ({
    textItem,
    updateText,
    isSelected,
    transform,
    onSelect,
}) => {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: textItem.id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                position: "absolute",
                left: `${textItem.xAxis}%`,
                top: `${textItem.yAxis}%`,
                transform: "translate(-50%, -50%)",
                fontSize: `${textItem.textSize}px`,
                color: textItem.titleColor,
                fontFamily: textItem.fontFamily,
                fontWeight: "bold",
                opacity: isDragging ? 0.7 : 1,
                zIndex: isDragging ? 1000 : isSelected ? 500 : 10,
                cursor: "move",
                userSelect: "none",
                padding: "8px 16px",
                border: isSelected
                    ? "3px dashed #a855f7"
                    : "2px solid transparent",
                borderRadius: "12px",
                background: isSelected
                    ? "rgba(168, 85, 247, 0.2)"
                    : "transparent",
                boxShadow: isSelected
                    ? "0 0 20px rgba(168, 85, 247, 0.5)"
                    : "none",
                transition: isDragging ? "none" : "all 0.2s ease", // ড্র্যাগের সময় ঝাঁকুনি বন্ধ
            }}
            {...attributes}
            {...listeners} // এটা দিলে ড্র্যাগ হবে
            onClick={(e) => {
                e.stopPropagation();
                onSelect(textItem.id);
            }}
            className="text-center select-none"
        >
            {textItem.title || "Click to edit"}

            {/* Resize Handle */}
            {isSelected && (
                <div
                    className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-xl cursor-se-resize z-10"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startSize = textItem.textSize;

                        const onMove = (e) => {
                            const delta = Math.max(
                                e.clientX - startX,
                                e.clientY - startY
                            );
                            const newSize = Math.max(
                                12,
                                Math.min(140, startSize + delta / 3)
                            );
                            updateText(textItem.id, {
                                textSize: Math.round(newSize),
                            });
                        };

                        const onUp = () => {
                            document.removeEventListener("mousemove", onMove);
                            document.removeEventListener("mouseup", onUp);
                        };

                        document.addEventListener("mousemove", onMove);
                        document.addEventListener("mouseup", onUp);
                    }}
                />
            )}
        </div>
    );
};
const CustomizeProduct = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedTextId, setSelectedTextId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 0, delay: 0 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 100, tolerance: 5 },
        })
    );
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || !containerRef.current) return;

        // এই লাইনটা সবচেয়ে গুরুত্বপূর্ণ — delta থেকে নতুন পজিশন বের করো
        const delta = event.delta; // dnd-kit দেয় x, y চেঞ্জ

        // আগের পজিশন নিয়ে নতুন পজিশন হিসাব করো
        const oldText = currentDesign.texts.find((t) => t.id === active.id);
        if (!oldText) return;

        // কন্টেইনারের সাইজ দিয়ে পার্সেন্টেজে কনভার্ট করো
        const rect = containerRef.current.getBoundingClientRect();

        const deltaXPercent = (delta.x / rect.width) * 100;
        const deltaYPercent = (delta.y / rect.height) * 100;

        const newXAxis = oldText.xAxis + deltaXPercent;
        const newYAxis = oldText.yAxis + deltaYPercent;

        // বাউন্ড করো যাতে বাইরে না যায়
        const boundedX = Math.max(5, Math.min(95, newXAxis));
        const boundedY = Math.max(5, Math.min(95, newYAxis));

        updateText(active.id, {
            xAxis: Number(boundedX.toFixed(2)),
            yAxis: Number(boundedY.toFixed(2)),
        });
    };

    const [currentSide, setCurrentSide] = useState("front");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("text");
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(null);
    const [openTextLayers, setOpenTextLayers] = useState({});

    const {
        data,
        isLoading,
        error: productError,
    } = useGetProductDetailsQuery(slug);

    const [productCustomize, { isLoading: isCustomizeLoading }] =
        useProductCustomizeMutation();
    const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();

    const [removeFromCart] = useRemoveFromCartMutation();

    const { redo, cartItemId } = location.state || {};

    useEffect(() => {
        if (redo && cartItemId) {
            removeFromCart(cartItemId)
                .unwrap()
                .then(() =>
                    toast.success(
                        "Previous customization removed. Start fresh!"
                    )
                )
                .catch(() => toast.error("Failed to remove old item"));
        }
    }, [redo, cartItemId, removeFromCart]);

    const containerSizes = { width: "240px", height: "240px" };

    const [designs, setDesigns] = useState({
        front: {
            texts: [
                {
                    id: Date.now(),
                    title: "",
                    titleColor: "#000000",
                    textSize: 24,
                    fontFamily: "Anton",
                    xAxis: 50,
                    yAxis: 50,
                },
            ],
            uploadedImage: null,
            imagePosition: "below",
            imageXAxis: 50,
            imageYAxis: 30,
            imageSize: 50,
            containerWidth: 300,
            containerHeight: 300,
            containerXAxis: 50,
            containerYAxis: 50,
        },
        back: {
            texts: [
                {
                    id: Date.now() + 1,
                    title: "",
                    titleColor: "#000000",
                    textSize: 24,
                    fontFamily: "Anton",
                    xAxis: 50,
                    yAxis: 50,
                },
            ],
            uploadedImage: null,
            imagePosition: "below",
            imageXAxis: 50,
            imageYAxis: 30,
            imageSize: 50,
            containerWidth: 300,
            containerHeight: 300,
            containerXAxis: 50,
            containerYAxis: 50,
        },
    });

    const fileInputRef = useRef(null);
    const previewRef = useRef(null);
    const textContainerRef = useRef(null);
    const containerRef = useRef(null);
    const currentDesign = designs[currentSide];

    const imagePositionStyle = {
        left: `${currentDesign.imageXAxis}%`,
        top: `${currentDesign.imageYAxis}%`,
        transform: "translate(-50%, -50%)",
        width: `${currentDesign.imageSize}%`,
        maxWidth: "200px",
        zIndex: currentDesign.imagePosition === "below" ? 1 : 10,
    };

    const containerStyle = {
        position: "absolute",
        width: `${currentDesign.containerWidth}px`,
        height: `${currentDesign.containerHeight}px`,
        left: `${currentDesign.containerXAxis}%`,
        top: `${currentDesign.containerYAxis}%`,
        transform: "translate(-50%, -50%)",

        overflow: "hidden",
        pointerEvents: "auto",
        zIndex: 5,
    };

    const fontOptions = [
        { id: "glamour", name: "Glamour", value: "glamour" },
        { id: "anton", name: "Anton", value: "Anton" },
        { id: "abril", name: "Abril Fatface", value: "Abril Fatface" },
        {
            id: "leagueSparton",
            name: "League Spartan",
            value: "League Spartan",
        },
        { id: "yesevaOne", name: "Yeseva One", value: "Yeseva One" },
        { id: "chewy", name: "Chewy", value: "Chewy" },
        { id: "quicksand", name: "Quicksand", value: "Quicksand" },
        { id: "telegraph", name: "Telegraph", value: "telegraph" },
        { id: "futura", name: "Futura", value: "futura" },
        { id: "london", name: "London", value: "london" },
        { id: "lovelo", name: "Lovelo", value: "lovelo" },
        { id: "etna", name: "Etna", value: "etna" },
        { id: "copper", name: "Copper", value: "copper" },
    ];
    const colorOptions = [
        { id: "1", value: "#cc0000" },
        { id: "2", value: "#0025cc" },
        { id: "3", value: "#2e6417" },
        { id: "4", value: "#17320b" },
        { id: "5", value: "#004aad" },
        { id: "6", value: "#cc007e" },
        { id: "7", value: "#bc3fde" },
        { id: "8", value: "#ff751f" },
        { id: "9", value: "#cc4e00" },
        { id: "10", value: "#c28e4a" },
        { id: "11", value: "#744383" },
        { id: "12", value: "#fb475e" },
        { id: "13", value: "#ea71e7" },
        { id: "14", value: "#f0efec" },
        { id: "15", value: "#000000" },
    ];

    // Text Management Functions
    const addNewText = () => {
        const newText = {
            id: Date.now(),
            title: "",
            titleColor: "black",
            textSize: 18,
            fontFamily: "Anton",
            xAxis: 50,
            yAxis: 50,
        };
        setDesigns((prev) => ({
            ...prev,
            [currentSide]: {
                ...prev[currentSide],
                texts: [...prev[currentSide].texts, newText],
            },
        }));
    };

    const removeText = (id) => {
        setDesigns((prev) => ({
            ...prev,
            [currentSide]: {
                ...prev[currentSide],
                texts: prev[currentSide].texts.filter((t) => t.id !== id),
            },
        }));
    };

    const updateText = (id, updates) => {
        setDesigns((prev) => ({
            ...prev,
            [currentSide]: {
                ...prev[currentSide],
                texts: prev[currentSide].texts.map((t) =>
                    t.id === id ? { ...t, ...updates } : t
                ),
            },
        }));
    };

    const updateDesign = (updates) => {
        setDesigns((prev) => ({
            ...prev,
            [currentSide]: { ...prev[currentSide], ...updates },
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) =>
                updateDesign({ uploadedImage: e.target.result });
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        updateDesign({ uploadedImage: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const generateImageForSide = async (side) => {
        await document.fonts.ready;
        const originalSide = currentSide;
        setCurrentSide(side);
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!previewRef.current || !textContainerRef.current) {
            setCurrentSide(originalSide);
            throw new Error(`Preview not ready for ${side}`);
        }

        let originalClassName = textContainerRef.current.className;
        try {
            textContainerRef.current.className = originalClassName.replace(
                /border-2 border-dotted border-white/,
                ""
            );

            const baseImage = previewRef.current.querySelector("img");
            if (!baseImage) throw new Error(`Base image not found for ${side}`);

            if (baseImage.complete === false || baseImage.naturalWidth === 0) {
                await new Promise((resolve, reject) => {
                    baseImage.onload = resolve;
                    baseImage.onerror = () =>
                        reject(new Error(`Failed to load ${side} image`));
                    if (baseImage.complete && baseImage.naturalWidth !== 0)
                        resolve();
                });
            }

            const dataUrl = await toPng(previewRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: "#ffffff",
                canvasWidth: 700,
                canvasHeight: 600,
                style: { width: "700px", height: "600px" },
            });

            textContainerRef.current.className = originalClassName;
            setCurrentSide(originalSide);
            return dataUrl;
        } catch (error) {
            textContainerRef.current.className = originalClassName;
            setCurrentSide(originalSide);
            setImageLoadError(
                `Failed to generate ${side} image: ${error.message}`
            );
            throw error;
        }
    };

    const handleUpdateProduct = async () => {
        if (isUpdating || isCustomizeLoading || isCartLoading) return;
        setIsUpdating(true);

        try {
            await document.fonts.ready;
            const isFrontCustomized =
                designs.front.texts.some((t) => t.title.trim()) ||
                designs.front.uploadedImage;
            const isBackCustomized =
                designs.back.texts.some((t) => t.title.trim()) ||
                designs.back.uploadedImage;

            if (!isFrontCustomized && !isBackCustomized) {
                toast.error("Please customize at least one side!");
                return;
            }

            if (!data?.product?.customization?.front_image && isFrontCustomized)
                throw new Error("Front base image is missing.");
            if (!data?.product?.customization?.back_image && isBackCustomized)
                throw new Error("Back base image is missing.");

            let frontImage = "",
                backImage = "";
            if (isFrontCustomized)
                frontImage = await generateImageForSide("front");
            if (isBackCustomized)
                backImage = await generateImageForSide("back");

            const side =
                isFrontCustomized && isBackCustomized
                    ? "both"
                    : isFrontCustomized
                    ? "front"
                    : "back";

            const customizePayload = {
                product_id: data?.product?.id,
                side,
                front_price: isFrontCustomized
                    ? data?.product?.customization?.front_price || 4
                    : 0,
                back_price: isBackCustomized
                    ? data?.product?.customization?.back_price
                    : 0,
                both_price:
                    isFrontCustomized && isBackCustomized
                        ? data?.product?.customization?.both_price || 8
                        : 0,
                front_image: frontImage,
                back_image: backImage,
                text_front: JSON.stringify(
                    designs.front.texts.map((t) => ({
                        title: t.title,
                        x_position: `${t.xAxis}%`,
                        y_position: `${t.yAxis}%`,
                        size: `${t.textSize}px`,
                        color: t.titleColor,
                        font_family: t.fontFamily,
                    }))
                ),
                text_back: JSON.stringify(
                    designs.back.texts.map((t) => ({
                        title: t.title,
                        x_position: `${t.xAxis}%`,
                        y_position: `${t.yAxis}%`,
                        size: `${t.textSize}px`,
                        color: t.titleColor,
                        font_family: t.fontFamily,
                    }))
                ),
                container_front: JSON.stringify({
                    width: designs.front.containerWidth,
                    height: designs.front.containerHeight,
                    x_position: `${designs.front.containerXAxis}%`,
                    y_position: `${designs.front.containerYAxis}%`,
                }),
                container_back: JSON.stringify({
                    width: designs.front.containerWidth,
                    height: designs.front.containerHeight,
                    x_position: `${designs.back.containerXAxis}%`,
                    y_position: `${designs.back.containerYAxis}%`,
                }),
                image_front: designs.front.uploadedImage
                    ? JSON.stringify({
                          position: "below",
                          x_position: `${designs.front.imageXAxis}%`,
                          y_position: `${designs.front.imageYAxis}%`,
                          size: `${designs.front.imageSize}%`,
                      })
                    : "",
                image_back: designs.back.uploadedImage
                    ? JSON.stringify({
                          position: "below",
                          x_position: `${designs.back.imageXAxis}%`,
                          y_position: `${designs.back.imageYAxis}%`,
                          size: `${designs.back.imageSize}%`,
                      })
                    : "",
                _prevent_duplicate: Date.now(),
            };

            const customizeResponse = await productCustomize(
                customizePayload
            ).unwrap();
            const customizationId =
                customizeResponse?.data?.customization_id ||
                customizeResponse?.customization_id;

            if (!customizationId)
                throw new Error("Customization ID not returned");

            const price =
                isFrontCustomized && isBackCustomized
                    ? data?.product?.customization?.both_price || 8
                    : 4;

            await addToCart({
                product_id: data?.product?.id,
                qty: 1,
                customization_id: customizationId,
                price,
            }).unwrap();

            dispatch(eCommerceApi.util.invalidateTags(["Cart"]));
            toast.success("Successfully added to cart!");
            navigate("/cart");
        } catch (error) {
            toast.error(
                `Failed: ${
                    error?.data?.message || error?.message || "Unknown error"
                }`
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDownload = async () => {
        if (!previewRef.current) return;
        await document.fonts.ready;
        let originalClassName = textContainerRef.current?.className || "";
        try {
            if (textContainerRef.current) {
                textContainerRef.current.className = originalClassName.replace(
                    /border-2 border-dotted border-white/,
                    ""
                );
            }
            const dataUrl = await toPng(previewRef.current, {
                cacheBust: true,
                pixelRatio: 2,
            });
            if (textContainerRef.current)
                textContainerRef.current.className = originalClassName;

            const link = document.createElement("a");
            link.download = `custom-${currentSide}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            if (textContainerRef.current)
                textContainerRef.current.className = originalClassName;
            toast.error("Download failed");
        }
    };

    const toggleSide = (side) => {
        setCurrentSide(side);
        setImageLoadError(null);
    };

    const openPreview = async () => {
        await document.fonts.ready;
        if (!data?.product?.customization?.[currentSide + "_image"]) {
            toast.error(`No ${currentSide} image available.`);
            return;
        }
        setIsPreviewOpen(true);
    };

    const closePreview = () => setIsPreviewOpen(false);

    if (isLoading)
        return <h2 className="text-center text-white">Loading...</h2>;
    if (productError)
        return (
            <h2 className="text-center text-red-500">
                Error: {productError.message}
            </h2>
        );
    if (
        !data?.product?.customization?.front_image &&
        !data?.product?.customization?.back_image
    ) {
        return (
            <h2 className="text-center text-yellow-500">
                No customization available.
            </h2>
        );
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark1 py-8 px-1 lg:px-4">
                <div className="w-full 2xl:max-w-4/5 mx-auto bg-dark2 rounded-xl overflow-hidden animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-6">
                        {/* Mobile Preview Skeleton */}
                        <div className="md:hidden">
                            <div className="bg-dark1/50 p-6 rounded-xl">
                                <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-6"></div>
                                <div className="bg-gray-800 rounded-lg h-96 w-full mx-auto"></div>
                            </div>
                        </div>

                        {/* Left Panel - Form Skeleton */}
                        <div className="bg-dark1 p-6 rounded-lg space-y-6">
                            {/* Tabs */}
                            <div className="flex gap-2 rounded-xl overflow-hidden">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 h-12 bg-gray-700 rounded-lg"
                                    ></div>
                                ))}
                            </div>

                            {/* Text Layers Skeleton */}
                            <div className="space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-800/60 border border-gray-700 rounded-xl p-4"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="h-6 bg-gray-700 rounded w-32"></div>
                                            <div className="h-6 bg-gray-700 rounded w-20"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-10 bg-gray-700 rounded"></div>
                                                <div className="h-10 bg-gray-700 rounded"></div>
                                            </div>
                                            <div className="h-10 bg-gray-700 rounded"></div>
                                            <div className="flex gap-3">
                                                {[...Array(5)].map((_, j) => (
                                                    <div
                                                        key={j}
                                                        className="w-12 h-12 bg-gray-700 rounded-full"
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="h-12 bg-gray-700 rounded-xl"></div>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="h-14 bg-gray-700 rounded-2xl"></div>
                        </div>

                        {/* Desktop Preview Skeleton */}
                        <div className="hidden md:block sticky top-4">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex gap-2">
                                    {[...Array(2)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-24 bg-gray-700 rounded-lg"
                                        ></div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
                                    <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg h-96 w-full mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-dark1 py-8 px-1 lg:px-4">
            <div className="w-full 2xl:max-w-4/5 mx-auto bg-dark2 rounded-xl overflow-hidden">
                {/* মূল গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-6 min-h-screen md:items-start">
                    {/* Left: Form — শুধু এটার স্ক্রল হবে */}
                    <div className="order-2 md:order-1 bg-dark1 p-4 rounded-lg shadow-md md:max-h-screen md:overflow-y-auto">
                        {/* ট্যাব */}
                        <div className="flex mb-8   rounded-xl   overflow-hidden border border-gray-700">
                            {["text", "image", "container"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 ${
                                        activeTab === tab
                                            ? "bg-cream text-dark1 shadow-lg shadow-purple-500/30"
                                            : "text-gray-400 hover:text-white hover:bg-gray-700/70"
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Text Tab */}
                        {activeTab === "text" && (
                            <div className="space-y-4">
                                {currentDesign.texts.map((textItem, index) => {
                                    const isOpen =
                                        openTextLayers[textItem.id] ??
                                        index === 0; // প্রথমটা ডিফল্ট ওপেন

                                    return (
                                        <div
                                            key={textItem.id}
                                            className="border border-gray-600 rounded-xl overflow-hidden bg-gray-800/60 shadow-lg"
                                        >
                                            {/* Header */}
                                            <div
                                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/80 transition-all duration-200"
                                                onClick={() =>
                                                    setOpenTextLayers(
                                                        (prev) => ({
                                                            ...prev,
                                                            [textItem.id]:
                                                                !prev[
                                                                    textItem.id
                                                                ],
                                                        })
                                                    )
                                                }
                                            >
                                                <h4 className="text-md font-bold text-white flex items-center gap-3">
                                                    <span className="text-cream">
                                                        Text {index + 1}
                                                    </span>
                                                    {textItem.title && (
                                                        <span className="text-sm font-normal text-gray truncate max-w-xs">
                                                            "{textItem.title}"
                                                        </span>
                                                    )}
                                                </h4>

                                                <div className="flex items-center gap-4">
                                                    {currentDesign.texts
                                                        .length > 1 && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeText(
                                                                    textItem.id
                                                                );
                                                                setOpenTextLayers(
                                                                    (prev) => {
                                                                        const updated =
                                                                            {
                                                                                ...prev,
                                                                            };
                                                                        delete updated[
                                                                            textItem
                                                                                .id
                                                                        ];
                                                                        return updated;
                                                                    }
                                                                );
                                                            }}
                                                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}

                                                    <svg
                                                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                                                            isOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            {isOpen && (
                                                <div className="p-6 border-t border-gray-700 space-y-6 bg-gray-800/40">
                                                    <input
                                                        type="text"
                                                        value={textItem.title}
                                                        onChange={(e) =>
                                                            updateText(
                                                                textItem.id,
                                                                {
                                                                    title: e
                                                                        .target
                                                                        .value,
                                                                }
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                                                        placeholder="Enter your text here..."
                                                    />

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-sm text-gray-300 mb-2">
                                                                X Position:{" "}
                                                                {textItem.xAxis}
                                                                %
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={
                                                                    textItem.xAxis
                                                                }
                                                                onChange={(e) =>
                                                                    updateText(
                                                                        textItem.id,
                                                                        {
                                                                            xAxis: +e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-300 mb-2">
                                                                Y Position:{" "}
                                                                {textItem.yAxis}
                                                                %
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={
                                                                    textItem.yAxis
                                                                }
                                                                onChange={(e) =>
                                                                    updateText(
                                                                        textItem.id,
                                                                        {
                                                                            yAxis: +e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-300 mb-2">
                                                            Text Size:{" "}
                                                            {textItem.textSize}
                                                            px
                                                        </label>
                                                        <input
                                                            type="range"
                                                            min="12"
                                                            max="72"
                                                            value={
                                                                textItem.textSize
                                                            }
                                                            onChange={(e) =>
                                                                updateText(
                                                                    textItem.id,
                                                                    {
                                                                        textSize:
                                                                            +e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-white mb-3">
                                                            Text Color
                                                        </label>
                                                        <div className="flex gap-3 flex-wrap">
                                                            {colorOptions.map(
                                                                (color) => (
                                                                    <button
                                                                        key={
                                                                            color.id
                                                                        }
                                                                        onClick={() =>
                                                                            updateText(
                                                                                textItem.id,
                                                                                {
                                                                                    titleColor:
                                                                                        color.value,
                                                                                }
                                                                            )
                                                                        }
                                                                        className={`w-12 h-12 rounded-full border-4 transition-all ${
                                                                            textItem.titleColor ===
                                                                            color.value
                                                                                ? "border-white shadow-lg scale-110"
                                                                                : "border-gray-600 hover:border-gray-400"
                                                                        }`}
                                                                        style={{
                                                                            backgroundColor:
                                                                                color.value,
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-white mb-2">
                                                            Font Style
                                                        </label>
                                                        <select
                                                            value={
                                                                textItem.fontFamily
                                                            }
                                                            onChange={(e) =>
                                                                updateText(
                                                                    textItem.id,
                                                                    {
                                                                        fontFamily:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                                        >
                                                            {fontOptions.map(
                                                                (font) => (
                                                                    <option
                                                                        key={
                                                                            font.id
                                                                        }
                                                                        value={
                                                                            font.value
                                                                        }
                                                                    >
                                                                        {
                                                                            font.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <button
                                    onClick={addNewText}
                                    className="w-full py-3 mt-2 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-md rounded-xl shadow-2xl  "
                                >
                                    + Add New Text
                                </button>
                            </div>
                        )}

                        {/* Image Tab */}
                        {activeTab === "image" && (
                            <div>
                                <div className="mb-3 rounded-lg">
                                    <h3 className="text-sm font-semibold text-cream mb-1">
                                        Upload Image/Sticker
                                    </h3>
                                    <div className="mb-1">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg text-cream cursor-pointer focus:outline-none"
                                        />
                                    </div>
                                    {currentDesign.uploadedImage && (
                                        <div className="space-y-4 mt-4 p-3 bg-dark1 rounded-lg">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-cream mb-0">
                                                        Image X-Position:{" "}
                                                        {
                                                            currentDesign.imageXAxis
                                                        }
                                                        %
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={
                                                            currentDesign.imageXAxis
                                                        }
                                                        onChange={(e) =>
                                                            updateDesign({
                                                                imageXAxis:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            })
                                                        }
                                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-cream mb-0">
                                                        Image Y-Position:{" "}
                                                        {
                                                            currentDesign.imageYAxis
                                                        }
                                                        %
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={
                                                            currentDesign.imageYAxis
                                                        }
                                                        onChange={(e) =>
                                                            updateDesign({
                                                                imageYAxis:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            })
                                                        }
                                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-cream mb-0">
                                                        Image Size:{" "}
                                                        {
                                                            currentDesign.imageSize
                                                        }
                                                        %
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="10"
                                                        max="100"
                                                        value={
                                                            currentDesign.imageSize
                                                        }
                                                        onChange={(e) =>
                                                            updateDesign({
                                                                imageSize:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            })
                                                        }
                                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRemoveImage}
                                                className="w-full bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-300"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Container Tab */}
                        {/* Container Tab */}
                        {activeTab === "container" && (
                            <div className="space-y-8">
                                <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-cream mb-6 text-center">
                                        Design Area Size & Position
                                    </h3>

                                    {/* Width Control */}
                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-sm font-medium text-gray-300">
                                                Width:{" "}
                                                <span className="text-cream font-bold">
                                                    {
                                                        currentDesign.containerWidth
                                                    }
                                                    px
                                                </span>
                                            </label>
                                            <span className="text-xs text-gray-500">
                                                140px - 400px
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="140"
                                            max="400"
                                            step="10"
                                            value={currentDesign.containerWidth}
                                            onChange={(e) =>
                                                updateDesign({
                                                    containerWidth:
                                                        +e.target.value,
                                                })
                                            }
                                            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                                            style={{
                                                background: `linear-gradient(to right, #d946ef ${
                                                    ((currentDesign.containerWidth -
                                                        140) /
                                                        260) *
                                                    100
                                                }%, #374151 ${
                                                    ((currentDesign.containerWidth -
                                                        140) /
                                                        260) *
                                                    100
                                                }%)`,
                                            }}
                                        />
                                    </div>

                                    {/* Height Control */}
                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-sm font-medium text-gray-300">
                                                Height:{" "}
                                                <span className="text-cream font-bold">
                                                    {
                                                        currentDesign.containerHeight
                                                    }
                                                    px
                                                </span>
                                            </label>
                                            <span className="text-xs text-gray-500">
                                                140px - 400px
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="140"
                                            max="400"
                                            step="10"
                                            value={
                                                currentDesign.containerHeight
                                            }
                                            onChange={(e) =>
                                                updateDesign({
                                                    containerHeight:
                                                        +e.target.value,
                                                })
                                            }
                                            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-accent"
                                            style={{
                                                background: `linear-gradient(to right, #d946ef ${
                                                    ((currentDesign.containerHeight -
                                                        140) /
                                                        260) *
                                                    100
                                                }%, #374151 ${
                                                    ((currentDesign.containerHeight -
                                                        140) /
                                                        260) *
                                                    100
                                                }%)`,
                                            }}
                                        />
                                    </div>

                                    {/* Position Controls */}
                                    <div className="grid grid-cols-2 gap-6 mt-8">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2">
                                                X Position:{" "}
                                                {currentDesign.containerXAxis}%
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={
                                                    currentDesign.containerXAxis
                                                }
                                                onChange={(e) =>
                                                    updateDesign({
                                                        containerXAxis:
                                                            +e.target.value,
                                                    })
                                                }
                                                className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2">
                                                Y Position:{" "}
                                                {currentDesign.containerYAxis}%
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={
                                                    currentDesign.containerYAxis
                                                }
                                                onChange={(e) =>
                                                    updateDesign({
                                                        containerYAxis:
                                                            +e.target.value,
                                                    })
                                                }
                                                className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        onClick={() =>
                                            updateDesign({
                                                containerWidth: 240,
                                                containerHeight: 240,
                                                containerXAxis: 50,
                                                containerYAxis: 50,
                                            })
                                        }
                                        className="w-full mt-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                                    >
                                        Reset to Default (240×240)
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleUpdateProduct}
                            disabled={
                                isUpdating ||
                                isCustomizeLoading ||
                                isCartLoading
                            }
                            className={`w-full py-3 mt-3 rounded-2xl font-bold text-lg text-white shadow-2xl transform transition-all duration-500 ${
                                isUpdating ||
                                isCustomizeLoading ||
                                isCartLoading
                                    ? "bg-gray-700 cursor-not-allowed opacity-70"
                                    : "bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 shadow-pink-500/50 active:scale-98"
                            }`}
                        >
                            {isUpdating ||
                            isCustomizeLoading ||
                            isCartLoading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg
                                        className="animate-spin h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Customize & Add to Cart"
                            )}
                        </button>
                    </div>

                    {/* Right: Preview (Desktop) — Sticky */}
                    <div className=" flex order-1 md:order-2 flex-col items-start  justify-start sticky top-1 z-10">
                        <div className=" z-20   p-4">
                            <div className="flex justify-between items-center gap-4">
                                {/* Front / Back Switch */}
                                <div className="flex   rounded-xl p-1 border border-white/20">
                                    {["front", "back"].map((side) => (
                                        <button
                                            key={side}
                                            onClick={() => toggleSide(side)}
                                            className={`px-5 py-1 rounded-lg font-bold text-sm transition-all duration-300 cursor-pointer ${
                                                currentSide === side
                                                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                                            }`}
                                        >
                                            {side.charAt(0).toUpperCase() +
                                                side.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {/* Preview & Download Icons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={openPreview}
                                        className="py-1 px-5 bg-white/10 cursor-pointer hover:bg-white/20 backdrop-blur-md rounded-xl transition-all hover:scale-110"
                                        title="Full Preview"
                                    >
                                        <FaEye
                                            className="w-6 h-6 text-white"
                                            cursor-pointer
                                        />
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="py-1 px-5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all hover:scale-110"
                                        title="Download PNG"
                                    >
                                        <MdOutlineFileDownload className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {imageLoadError ? (
                            <p className="text-red-500">{imageLoadError}</p>
                        ) : !data?.product?.customization?.[
                              currentSide + "_image"
                          ] ? (
                            <p className="text-cream">
                                No {currentSide} image available.
                            </p>
                        ) : (
                            <figure
                                ref={previewRef}
                                className="relative w-full max-w-2xl mx-auto"
                            >
                                <img
                                    src={`/${
                                        data?.product?.customization?.[
                                            currentSide + "_image"
                                        ]
                                    }`}
                                    alt={currentSide}
                                    className="w-full h-auto rounded-2xl shadow-2xl"
                                />

                                {/* Design Container */}
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div
                                        ref={containerRef}
                                        style={{
                                            ...containerStyle,
                                            pointerEvents: "auto", // এটা অবশ্যই auto থাকতে হবে!
                                            border: "3px dashed rgba(255,255,255,0.3)",
                                            background:
                                                "rgba(255,255,255,0.05)",
                                            borderRadius: "16px",
                                        }}
                                        className="absolute inset-0 flex items-center justify-center overflow-hidden"
                                    >
                                        {/* ইমেজ থাকলে */}
                                        {currentDesign.uploadedImage && (
                                            <img
                                                src={
                                                    currentDesign.uploadedImage
                                                }
                                                alt="Sticker"
                                                style={imagePositionStyle}
                                                className="absolute object-contain pointer-events-none z-10"
                                            />
                                        )}

                                        {/* সব টেক্সট এখানে */}
                                        {currentDesign.texts.map((textItem) => (
                                            <DraggableResizableText
                                                key={textItem.id}
                                                textItem={textItem}
                                                updateText={updateText}
                                                isSelected={
                                                    selectedTextId ===
                                                    textItem.id
                                                }
                                                onPointerDown={(e) => {
                                                    e.stopPropagation();
                                                    onSelect(textItem.id); // ক্লিক করলেই সিলেক্ট
                                                }}
                                                onSelect={setSelectedTextId}
                                            />
                                        ))}
                                    </div>
                                </DndContext>
                            </figure>
                        )}
                    </div>
                </div>
            </div>

            {/* Full Preview Modal */}
            <Modal
                isOpen={isPreviewOpen}
                onRequestClose={closePreview}
                style={customStyles}
                contentLabel="Preview Modal"
                ariaHideApp={false}
            >
                <div className="flex flex-col items-center bg-white">
                    <div className="flex justify-between items-center w-full mb-4">
                        <h2 className="text-xl font-bold text-dark1">
                            {currentSide.charAt(0).toUpperCase() +
                                currentSide.slice(1)}{" "}
                            Design Preview
                        </h2>
                        <button
                            onClick={closePreview}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex justify-center w-full">
                        {imageLoadError ? (
                            <p className="text-red-500">{imageLoadError}</p>
                        ) : !data?.product?.customization?.[
                              currentSide + "_image"
                          ] ? (
                            <p>No {currentSide} image available for preview.</p>
                        ) : (
                            <figure className="relative w-full max-w-md h-auto">
                                <div className="relative w-full aspect-7/6">
                                    <img
                                        src={`/${
                                            data.product.customization[
                                                currentSide + "_image"
                                            ]
                                        }`}
                                        alt={`${currentSide} view`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden"
                                    style={containerStyle}
                                >
                                    {currentDesign.uploadedImage && (
                                        <img
                                            src={currentDesign.uploadedImage}
                                            alt="Uploaded sticker"
                                            className="absolute object-contain"
                                            style={imagePositionStyle}
                                            crossOrigin="anonymous"
                                        />
                                    )}
                                    {currentDesign.texts.map(
                                        (textItem) =>
                                            textItem.title && (
                                                <p
                                                    // font-${textItem.fontFamily}
                                                    key={textItem.id}
                                                    className={`absolute wrap-word font-bold text-center w-full `}
                                                    style={{
                                                        fontSize: `${textItem.textSize}px`,
                                                        color: textItem.titleColor,
                                                        fontFamily:
                                                            textItem.fontFamily,
                                                        left: `${textItem.xAxis}%`,
                                                        top: `${textItem.yAxis}%`,
                                                        transform:
                                                            "translate(-50%, -50%)",
                                                        zIndex:
                                                            currentDesign.imagePosition ===
                                                            "below"
                                                                ? 10
                                                                : 1,
                                                    }}
                                                >
                                                    {textItem.title}
                                                </p>
                                            )
                                    )}
                                </div>
                            </figure>
                        )}
                    </div>
                    <button
                        onClick={closePreview}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                    >
                        Close Preview
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CustomizeProduct;
