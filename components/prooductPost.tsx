"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  Video,
  X,
  Plus,
  Minus,
  Upload,
  Trash2,
  Package,
} from "lucide-react";

type MediaType = "image" | "video";

type ProductForm = {
  type: string;
  title: string;
  brand: string;
  price: string;
  maxPrice: string;
  discount: string;
  description: string;
  availability: string;
};

const productTypes = [
  "Shirt",
  "T-Shirt",
  "Jeans",
  "Kurtis",
  "Dress",
  "Saree",
  "Innerwear",
  "Jacket",
  "Shoes",
  "Accessories",
  "Other",
];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Free Size"];

export default function CreateProduct() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [mediaType, setMediaType] = useState<MediaType>("image");

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [sizes, setSizes] = useState<string[]>([]);

  const [form, setForm] = useState<ProductForm>({
    type: "",
    title: "",
    brand: "",
    price: "",
    maxPrice: "",
    discount: "",
    description: "",
    availability: "available",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =====================================================
  // MEDIA TYPE
  // =====================================================

  const changeMediaType = (type: MediaType) => {
    setMediaType(type);

    setImages([]);
    setVideo(null);

    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setImagePreviews([]);
    setVideoPreview(null);

    setErrors((prev) => ({
      ...prev,
      media: "",
    }));
  };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const remainingSlots = 5 - images.length;

    if (remainingSlots <= 0) {
      setErrors((prev) => ({
        ...prev,
        media: "Maximum 5 images allowed.",
      }));
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    const invalidFiles = selectedFiles.filter(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        media: "Only image files are allowed.",
      }));
      return;
    }

    const newImages = [...images, ...selectedFiles];

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages(newImages);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    setErrors((prev) => ({
      ...prev,
      media: "",
    }));

    e.target.value = "";
  };

  // =====================================================
  // VIDEO UPLOAD
  // =====================================================

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setErrors((prev) => ({
        ...prev,
        media: "Please select a valid video.",
      }));
      return;
    }

    setVideo(file);

    const preview = URL.createObjectURL(file);

    setVideoPreview(preview);

    setErrors((prev) => ({
      ...prev,
      media: "",
    }));

    e.target.value = "";
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = (index: number) => {
    const preview = imagePreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // =====================================================
  // REMOVE VIDEO
  // =====================================================

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideo(null);
    setVideoPreview(null);
  };

  // =====================================================
  // SIZE SELECT
  // =====================================================

  const toggleSize = (size: string) => {
    setSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((item) => item !== size);
      }

      return [...prev, size];
    });
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (mediaType === "image" && images.length === 0) {
      newErrors.media = "Upload at least one product image.";
    }

    if (mediaType === "video" && !video) {
      newErrors.media = "Upload a product video.";
    }

    if (!form.type) {
      newErrors.type = "Select a product type.";
    }

    if (!form.title.trim()) {
      newErrors.title = "Product title is required.";
    }

    if (!form.brand.trim()) {
      newErrors.brand = "Brand is required.";
    }

    if (!form.price) {
      newErrors.price = "Enter the price.";
    }

    if (form.maxPrice && Number(form.maxPrice) < Number(form.price)) {
      newErrors.maxPrice =
        "Maximum price must be greater than or equal to price.";
    }

    if (
      form.discount &&
      (Number(form.discount) < 0 || Number(form.discount) > 100)
    ) {
      newErrors.discount = "Discount must be between 0 and 100.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Product description is required.";
    }

    if (sizes.length === 0) {
      newErrors.sizes = "Select at least one size.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // CREATE FORMDATA
  // =====================================================

  const createFormData = () => {
    const formData = new FormData();

    formData.append("mediaType", mediaType);

    formData.append("type", form.type);
    formData.append("title", form.title);
    formData.append("brand", form.brand);

    formData.append("price", form.price);

    if (form.maxPrice) {
      formData.append("maxPrice", form.maxPrice);
    }

    formData.append("discount", form.discount || "0");

    formData.append("description", form.description);

    formData.append("availability", form.availability);

    // Send sizes as JSON
    formData.append("sizes", JSON.stringify(sizes));

    // ================= IMAGES =================

    if (mediaType === "image") {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // ================= VIDEO =================

    if (mediaType === "video" && video) {
      formData.append("video", video);
    }

    return formData;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      const formData = createFormData();

      /*
       * Example API request:
       *
       * const response = await fetch(
       *   `${process.env.NEXT_PUBLIC_API_URL}/products`,
       *   {
       *     method: "POST",
       *     body: formData,
       *   }
       * );
       */

      console.log("FORM DATA READY");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Replace this with your API call.

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Product ready to upload.");
    } catch (error) {
      console.error(error);

      setErrors({
        submit: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b12] px-3 py-6 text-white md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7771b9]/20 text-[#aaa5ed]">
              <Package size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Create Product</h1>

              <p className="mt-1 text-sm text-white/40">
                Add a new product to your shop
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_420px]"
        >
          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="space-y-6">
            {/* ============================================== */}
            {/* MEDIA */}
            {/* ============================================== */}

            <section className="rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Product Media</h2>

                  <p className="mt-1 text-xs text-white/40">
                    Upload up to 5 images or one video
                  </p>
                </div>

                {/* MEDIA SWITCH */}

                <div className="flex rounded-full bg-black p-1">
                  <button
                    type="button"
                    onClick={() => changeMediaType("image")}
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-2
                      text-xs
                      font-medium
                      transition

                      ${
                        mediaType === "image"
                          ? "bg-white text-black"
                          : "text-white/50"
                      }
                    `}
                  >
                    <ImagePlus size={15} />
                    Images
                  </button>

                  <button
                    type="button"
                    onClick={() => changeMediaType("video")}
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-2
                      text-xs
                      font-medium
                      transition

                      ${
                        mediaType === "video"
                          ? "bg-white text-black"
                          : "text-white/50"
                      }
                    `}
                  >
                    <Video size={15} />
                    Video
                  </button>
                </div>
              </div>

              {/* MEDIA ERROR */}

              {errors.media && (
                <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errors.media}
                </p>
              )}

              {/* ================= IMAGES ================= */}

              {mediaType === "image" && (
                <div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={preview}
                        className="
                            group
                            relative
                            aspect-[3/4]
                            overflow-hidden
                            rounded-2xl
                            bg-black
                          "
                      >
                        <img
                          src={preview}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="
                              absolute
                              right-2
                              top-2
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-full
                              bg-black/70
                              text-white
                              backdrop-blur
                            "
                        >
                          <X size={15} />
                        </button>

                        {/* NUMBER */}

                        <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[10px] text-white">
                          {index + 1}
                        </div>
                      </div>
                    ))}

                    {/* ADD IMAGE */}

                    {images.length < 5 && (
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="
                          flex
                          aspect-[3/4]
                          flex-col
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-dashed
                          border-white/20
                          bg-black/20
                          text-white/40
                          transition
                          hover:border-white/40
                          hover:text-white
                        "
                      >
                        <Plus size={26} />

                        <span className="mt-2 text-xs">Add Image</span>

                        <span className="mt-1 text-[10px]">
                          {images.length}/5
                        </span>
                      </button>
                    )}
                  </div>

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImages}
                  />
                </div>
              )}

              {/* ================= VIDEO ================= */}

              {mediaType === "video" && (
                <div>
                  {!videoPreview ? (
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="
                        flex
                        aspect-video
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-white/20
                        bg-black/20
                        text-white/40
                        transition
                        hover:border-white/40
                        hover:text-white
                      "
                    >
                      <Video size={36} />

                      <p className="mt-3 text-sm font-medium">
                        Upload Product Video
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        Only 1 video allowed
                      </p>
                    </button>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl bg-black">
                      <video
                        src={videoPreview}
                        controls
                        playsInline
                        className="max-h-[600px] w-full"
                      />

                      <button
                        type="button"
                        onClick={removeVideo}
                        className="
                          absolute
                          right-3
                          top-3
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-black/70
                          text-white
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleVideo}
                  />
                </div>
              )}
            </section>

            {/* ============================================== */}
            {/* PRODUCT INFORMATION */}
            {/* ============================================== */}

            <section className="rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
              <h2 className="mb-5 font-semibold">Product Information</h2>

              <div className="space-y-5">
                {/* TYPE */}

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Product Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#101018]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      focus:border-[#7771b9]
                    "
                  >
                    <option value="">Select product type</option>

                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {errors.type && (
                    <p className="mt-1 text-xs text-red-400">{errors.type}</p>
                  )}
                </div>

                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Product Title
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Premium Cotton Shirt"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#101018]
                      px-4
                      text-sm
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#7771b9]
                    "
                  />

                  {errors.title && (
                    <p className="mt-1 text-xs text-red-400">{errors.title}</p>
                  )}
                </div>

                {/* BRAND */}

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Brand
                  </label>

                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Nike, Zara, Levi's..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#101018]
                      px-4
                      text-sm
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#7771b9]
                    "
                  />

                  {errors.brand && (
                    <p className="mt-1 text-xs text-red-400">{errors.brand}</p>
                  )}
                </div>

                {/* PRICE */}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        ₹
                      </span>

                      <input
                        name="price"
                        type="number"
                        min="0"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="999"
                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-[#101018]
                          pl-9
                          pr-4
                          text-sm
                          outline-none
                          placeholder:text-white/20
                          focus:border-[#7771b9]
                        "
                      />
                    </div>

                    {errors.price && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Max Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        ₹
                      </span>

                      <input
                        name="maxPrice"
                        type="number"
                        min="0"
                        value={form.maxPrice}
                        onChange={handleChange}
                        placeholder="1499"
                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-[#101018]
                          pl-9
                          pr-4
                          text-sm
                          outline-none
                          placeholder:text-white/20
                          focus:border-[#7771b9]
                        "
                      />
                    </div>

                    {errors.maxPrice && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.maxPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* DISCOUNT */}

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Discount
                  </label>

                  <div className="relative">
                    <input
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={form.discount}
                      onChange={handleChange}
                      placeholder="10"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-[#101018]
                        px-4
                        pr-12
                        text-sm
                        outline-none
                        placeholder:text-white/20
                        focus:border-[#7771b9]
                      "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                      %
                    </span>
                  </div>

                  {errors.discount && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.discount}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your product..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/10
                      bg-[#101018]
                      p-4
                      text-sm
                      outline-none
                      placeholder:text-white/20
                      focus:border-[#7771b9]
                    "
                  />

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div className="space-y-6">
            {/* ============================================== */}
            {/* AVAILABILITY */}
            {/* ============================================== */}

            <section className="rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
              <h2 className="mb-5 font-semibold">Availability</h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      availability: "available",
                    }))
                  }
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    transition

                    ${
                      form.availability === "available"
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                        : "border-white/10 bg-black/20 text-white/50"
                    }
                  `}
                >
                  Available
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      availability: "out_of_stock",
                    }))
                  }
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    transition

                    ${
                      form.availability === "out_of_stock"
                        ? "border-red-500/50 bg-red-500/10 text-red-300"
                        : "border-white/10 bg-black/20 text-white/50"
                    }
                  `}
                >
                  Out of Stock
                </button>
              </div>
            </section>

            {/* ============================================== */}
            {/* SIZES */}
            {/* ============================================== */}

            <section className="rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
              <div className="mb-5">
                <h2 className="font-semibold">Available Sizes</h2>

                <p className="mt-1 text-xs text-white/40">
                  Select all available sizes
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => {
                  const selected = sizes.includes(size);

                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`
                        rounded-xl
                        border
                        px-3
                        py-3
                        text-sm
                        transition

                        ${
                          selected
                            ? "border-[#7771b9] bg-[#7771b9]/20 text-white"
                            : "border-white/10 bg-black/20 text-white/50 hover:text-white"
                        }
                      `}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {errors.sizes && (
                <p className="mt-3 text-xs text-red-400">{errors.sizes}</p>
              )}
            </section>

            {/* ============================================== */}
            {/* SUMMARY */}
            {/* ============================================== */}

            <section className="rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
              <h2 className="mb-5 font-semibold">Product Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Media</span>

                  <span>
                    {mediaType === "image"
                      ? `${images.length}/5 images`
                      : video
                        ? "1 video"
                        : "No video"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Type</span>

                  <span>{form.type || "Not selected"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Sizes</span>

                  <span>{sizes.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Availability</span>

                  <span>
                    {form.availability === "available"
                      ? "Available"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </section>

            {/* ============================================== */}
            {/* SUBMIT */}
            {/* ============================================== */}

            <button
              type="submit"
              disabled={submitting}
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#7771b9]
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#8580c9]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Upload size={18} />

              {submitting ? "Uploading..." : "Publish Product"}
            </button>

            {errors.submit && (
              <p className="rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-300">
                {errors.submit}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
