import React, { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

const CustomizeProduct = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentSide, setCurrentSide] = useState("front");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("text");
    const [isUpdating, setIsUpdating] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(null);

    const {
        data,
        isLoading,
        error: productError,
    } = useGetProductDetailsQuery(slug);

    const [productCustomize, { isLoading: isCustomizeLoading }] =
        useProductCustomizeMutation();

    const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();
    const { data: cartData } = useGetCartDetailsQuery();
    const [removeFromCart] = useRemoveFromCartMutation();

    const { redo, cartItemId } = location.state || {};

    useEffect(() => {
        if (redo && cartItemId) {
            removeFromCart(cartItemId)
                .unwrap()
                .then(() => {
                    toast.success(
                        "Previous customization removed. Start fresh!"
                    );
                })
                .catch(() => {
                    toast.error("Failed to remove old item");
                });
        }
    }, [redo, cartItemId, removeFromCart]);

    const containerSizes = { width: "240px", height: "240px" };

    const [designs, setDesigns] = useState({
        front: {
            texts: [
                {
                    id: Date.now(),
                    title: "",
                    titleColor: "black",
                    textSize: 18,
                    fontFamily: "Story Script",
                    xAxis: 50,
                    yAxis: 50,
                },
            ],
            uploadedImage: null,
            imagePosition: "below",
            imageXAxis: 50,
            imageYAxis: 30,
            imageSize: 50,
            containerXAxis: 50,
            containerYAxis: 50,
        },
        back: {
            texts: [
                {
                    id: Date.now() + 1,
                    title: "",
                    titleColor: "black",
                    textSize: 18,
                    fontFamily: "Story Script",
                    xAxis: 50,
                    yAxis: 50,
                },
            ],
            uploadedImage: null,
            imagePosition: "below",
            imageXAxis: 50,
            imageYAxis: 30,
            imageSize: 50,
            containerXAxis: 50,
            containerYAxis: 50,
        },
    });

    const fileInputRef = useRef(null);
    const previewRef = useRef(null);
    const textContainerRef = useRef(null);

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
        width: containerSizes.width,
        height: containerSizes.height,
        left: `${currentDesign.containerXAxis}%`,
        top: `${currentDesign.containerYAxis}%`,
        transform: "translate(-50%, -50%)",
    };

    const fontOptions = [
        { id: "story", name: "Story Script", value: "Story Script" },
        { id: "monsieur", name: "Monsieur", value: "Monsieur La Doulaise" },
        { id: "michroma", name: "Michroma", value: "Michroma" },
        { id: "vidaloka", name: "Vidaloka", value: "Vidaloka" },
        { id: "manrope", name: "Manrope", value: "Manrope" },
    ];

    const colorOptions = [
        { id: "black", name: "Black", value: "black" },
        { id: "red", name: "Red", value: "red" },
        { id: "blue", name: "Blue", value: "blue" },
        { id: "green", name: "Green", value: "green" },
        { id: "purple", name: "Purple", value: "purple" },
    ];

    // Text Management Functions
    const addNewText = () => {
        const newText = {
            id: Date.now(),
            title: "",
            titleColor: "black",
            textSize: 18,
            fontFamily: "Story Script",
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
            reader.onload = (e) => {
                updateDesign({ uploadedImage: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        updateDesign({ uploadedImage: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const generateImageForSide = async (side) => {
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

            if (
                !data?.product?.customization?.front_image &&
                isFrontCustomized
            ) {
                throw new Error("Front base image is missing.");
            }
            if (!data?.product?.customization?.back_image && isBackCustomized) {
                throw new Error("Back base image is missing.");
            }

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
                    x_position: `${designs.front.containerXAxis}%`,
                    y_position: `${designs.front.containerYAxis}%`,
                }),
                container_back: JSON.stringify({
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

    const openPreview = () => {
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

    return (
        <div className="min-h-screen bg-dark1 py-8 px-1 lg:px-4">
            <div className="w-full 2xl:max-w-4/5 mx-auto bg-dark2 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1 lg:p-6 items-start">
                    {/* Left: Form */}
                    <div className="bg-dark1 p-4 rounded-lg shadow-md">
                        <div className="flex mb-4 border-b-2 border-red">
                            {["text", "image", "container"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 text-sm font-semibold cursor-pointer ${
                                        activeTab === tab
                                            ? "border-2 border-red rounded-t-md text-red font-bold"
                                            : "text-cream hover:text-red border-2 border-transparent"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Text Tab - Multiple Texts */}
                        {activeTab === "text" && (
                            <div className="space-y-6">
                                {currentDesign.texts.map((textItem, index) => (
                                    <div
                                        key={textItem.id}
                                        className="relative p-4 border border-gray-600 rounded-lg bg-dark2/50"
                                    >
                                        {currentDesign.texts.length > 1 && (
                                            <button
                                                onClick={() =>
                                                    removeText(textItem.id)
                                                }
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl font-bold"
                                            >
                                                ×
                                            </button>
                                        )}
                                        <h4 className="text-sm font-bold text-cream mb-3">
                                            Text Layer {index + 1}
                                        </h4>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={textItem.title}
                                                onChange={(e) =>
                                                    updateText(textItem.id, {
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg text-cream bg-dark1 focus:outline-none"
                                                placeholder={`Enter text ${
                                                    index + 1
                                                }`}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <label className="block text-xs font-medium text-cream/70 mb-1">
                                                    X-Axis: {textItem.xAxis}%
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={textItem.xAxis}
                                                    onChange={(e) =>
                                                        updateText(
                                                            textItem.id,
                                                            {
                                                                xAxis: parseInt(
                                                                    e.target
                                                                        .value
                                                                ),
                                                            }
                                                        )
                                                    }
                                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-cream/70 mb-1">
                                                    Y-Axis: {textItem.yAxis}%
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={textItem.yAxis}
                                                    onChange={(e) =>
                                                        updateText(
                                                            textItem.id,
                                                            {
                                                                yAxis: parseInt(
                                                                    e.target
                                                                        .value
                                                                ),
                                                            }
                                                        )
                                                    }
                                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-xs font-medium text-cream/70 mb-1">
                                                Text Size: {textItem.textSize}px
                                            </label>
                                            <input
                                                type="range"
                                                min="12"
                                                max="48"
                                                value={textItem.textSize}
                                                onChange={(e) =>
                                                    updateText(textItem.id, {
                                                        textSize: parseInt(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-sm font-semibold text-cream mb-2">
                                                Title Color
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color.id}
                                                        onClick={() =>
                                                            updateText(
                                                                textItem.id,
                                                                {
                                                                    titleColor:
                                                                        color.value,
                                                                }
                                                            )
                                                        }
                                                        className={`w-10 h-10 rounded-full border-2 ${
                                                            textItem.titleColor ===
                                                            color.value
                                                                ? "border-white"
                                                                : "border-gray-500"
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                color.value,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-cream mb-2">
                                                Font Style
                                            </label>
                                            <select
                                                value={textItem.fontFamily}
                                                onChange={(e) =>
                                                    updateText(textItem.id, {
                                                        fontFamily:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-xs text-cream bg-dark1 focus:outline-none"
                                            >
                                                {fontOptions.map((font) => (
                                                    <option
                                                        key={font.id}
                                                        value={font.value}
                                                        className="text-cream"
                                                    >
                                                        {font.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addNewText}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                                >
                                    + Add Another Text
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
                                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Container Tab */}
                        {activeTab === "container" && (
                            <div>
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-cream mb-2">
                                        Container Position
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-cream/70 mb-1">
                                                Container X-Axis:{" "}
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
                                                            parseInt(
                                                                e.target.value
                                                            ),
                                                    })
                                                }
                                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-cream/70 mb-1">
                                                Container Y-Axis:{" "}
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
                                                            parseInt(
                                                                e.target.value
                                                            ),
                                                    })
                                                }
                                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-cream mb-2">
                                Design Side
                            </label>
                            <div className="flex gap-4">
                                {["front", "back"].map((side) => (
                                    <button
                                        key={side}
                                        onClick={() => toggleSide(side)}
                                        className={`px-4 py-2 rounded-lg ${
                                            currentSide === side
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-300 text-dark1"
                                        }`}
                                    >
                                        {side.charAt(0).toUpperCase() +
                                            side.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={openPreview}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4"
                                disabled={
                                    isUpdating ||
                                    isCustomizeLoading ||
                                    isCartLoading
                                }
                            >
                                Preview Design
                            </button>
                            <button
                                onClick={handleDownload}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4"
                                disabled={
                                    isUpdating ||
                                    isCustomizeLoading ||
                                    isCartLoading
                                }
                            >
                                Download{" "}
                                {currentSide.charAt(0).toUpperCase() +
                                    currentSide.slice(1)}{" "}
                                PNG
                            </button>
                        </div>

                        <button
                            onClick={handleUpdateProduct}
                            disabled={
                                isUpdating ||
                                isCustomizeLoading ||
                                isCartLoading
                            }
                            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4 flex items-center justify-center ${
                                isUpdating ||
                                isCustomizeLoading ||
                                isCartLoading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 cursor-pointer"
                            }`}
                        >
                            {isUpdating ||
                            isCustomizeLoading ||
                            isCartLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
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
                                </>
                            ) : (
                                "Customize & Add to Cart"
                            )}
                        </button>
                    </div>

                    {/* Right: Preview */}
                    <div className="flex flex-col items-center justify-center z-10">
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
                                className="relative w-[700px] h-auto"
                            >
                                <div>
                                    <img
                                        src={`/${
                                            data.product.customization[
                                                currentSide + "_image"
                                            ]
                                        }`}
                                        alt={`${currentSide} view`}
                                        className="w-full h-full object-contain"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                                <div
                                    ref={textContainerRef}
                                    className="absolute flex items-center justify-center rounded-xl overflow-hidden border-2 border-dotted border-white"
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
                                                    key={textItem.id}
                                                    className="absolute wrap-word font-bold text-center w-full"
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
                </div>
            </div>

            <Modal
                isOpen={isPreviewOpen}
                onRequestClose={closePreview}
                style={customStyles}
                contentLabel="Preview Modal"
                ariaHideApp={false}
            >
                <div className="flex flex-col items-center z-1002 overflow-hidden bg-white">
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
                                    className="absolute flex items-center justify-center rounded-xl overflow-hidden"
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
                                                    key={textItem.id}
                                                    className="absolute wrap-word font-bold text-center w-full"
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
