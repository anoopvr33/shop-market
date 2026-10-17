"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
};

type ProductViewerProps = {
  products: Product[];
  selectedIndex: number | null;
  onClose: () => void;
};

export default function ProductViewer({
  products,
  selectedIndex,
  onClose,
}: ProductViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  /*
   * ================================
   * SCROLL TO SELECTED PRODUCT
   * ================================
   */

  useEffect(() => {
    if (selectedIndex === null) return;

    // Small delay allows images/components to render
    const timer = setTimeout(() => {
      const selectedElement = productRefs.current[selectedIndex];

      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedIndex]);

  /*
   * ================================
   * LOCK BACKGROUND SCROLL
   * ================================
   */

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  /*
   * ================================
   * KEYBOARD
   * ================================
   */

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      /*
       * Don't interfere with normal
       * scrolling when user is typing.
       */

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();

        const container = containerRef.current;

        if (!container) return;

        const amount = window.innerHeight * 0.8;

        container.scrollBy({
          top: event.key === "ArrowDown" ? amount : -amount,

          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, onClose]);

  /*
   * ================================
   * DON'T RENDER
   * ================================
   */

  if (selectedIndex === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Dark / Blurred Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close product viewer"
        className="
        fixed right-4 top-4 z-[10002]
        flex h-11 w-11 items-center justify-center
        rounded-full border border-white/10
        bg-black/60 text-white
        backdrop-blur-xl transition
        hover:bg-white/20
        md:right-6 md:top-6
      "
      >
        <X size={22} />
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="
        relative z-[10000]
        h-[100dvh] w-full
        overflow-y-auto
        overscroll-contain
        px-3 pb-20 pt-20
        md:px-8 md:pt-24
        lg:px-16
        touch-pan-y
        [scrollbar-width:thin]
      "
      >
        {/* Products */}
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(element) => {
                productRefs.current[index] = element;
              }}
              className="
              w-full
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-[#111116]
              shadow-2xl
            "
            >
              {/* ================================= */}
              {/* DESKTOP PRODUCT LAYOUT */}
              {/* ================================= */}

              <div className="flex flex-col md:min-h-[600px] md:flex-row">
                {/* ================================= */}
                {/* LEFT - PRODUCT DETAILS */}
                {/* ================================= */}

                <div
                  className="
                  order-2
                  flex
                  w-full
                  flex-col
                  justify-center
                  bg-[#0b0b0f]
                  p-5
                  md:order-1
                  md:w-[40%]
                  md:p-8
                  lg:p-10
                "
                >
                  {/* Seller */}
                  {/* <div className="mb-6 flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      overflow-hidden rounded-full
                      bg-neutral-800
                    "
                  >
                    {product.profileImage ? (
                      <img
                        src={product.profileImage}
                        alt={product.name || "Seller"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-white">
                        {(product.name || "S").charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {product.name || "Zudio"}
                    </p>

                    <p className="text-xs text-neutral-500">
                      {product.category || "Fashion"}
                    </p>
                  </div>
                </div> */}

                  {/* Product Title */}
                  <h2
                    className="
                    text-2xl
                    font-bold
                    leading-tight
                    text-white
                    md:text-3xl
                    lg:text-4xl
                  "
                  >
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                    text-neutral-400
                    md:text-base
                  "
                  >
                    {product?.description ||
                      "Hi, it's a very smooth and lightweight product. Would you like some?"}
                  </p>

                  {/* Price */}
                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-wider text-neutral-500">
                      Price
                    </p>

                    <p className="mt-1 text-3xl font-bold text-white">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-neutral-400">
                    <span>📍</span>

                    <span>{product?.location || "Thrissur"}</span>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px w-full bg-white/10" />

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Share */}
                    <button
                      type="button"
                      className="
                      flex h-10 items-center gap-2
                      rounded-full px-4
                      text-neutral-400
                      transition
                      hover:bg-green-400/10
                      hover:text-green-400
                    "
                    >
                      <span className="text-lg">↗</span>
                      <span className="text-xs">12</span>
                    </button>

                    {/* Like */}
                    <button
                      type="button"
                      className="
                      flex h-10 items-center gap-2
                      rounded-full px-4
                      text-neutral-400
                      transition
                      hover:bg-red-400/10
                      hover:text-red-400
                    "
                    >
                      <span className="text-xl">♡</span>
                      <span className="text-xs">100</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      type="button"
                      className="
                      ml-auto
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      text-neutral-400
                      transition
                      hover:bg-white/10
                      hover:text-white
                    "
                    >
                      🔖
                    </button>
                  </div>

                  {/* Product Number */}
                  <div className="mt-8 text-xs text-neutral-600">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(products.length).padStart(2, "0")}
                  </div>
                </div>

                {/* ================================= */}
                {/* RIGHT - PRODUCT IMAGE */}
                {/* ================================= */}

                <div
                  className="
                  order-1
                  relative
                  flex
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  bg-black
                  md:order-2
                  md:w-[60%]
                "
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={1200}
                    height={1600}
                    priority={index === selectedIndex}
                    className="
                    block
                    h-auto
                    max-h-[75vh]
                    w-auto
                    max-w-full
                    object-contain
                    md:max-h-[650px]
                  "
                  />

                  {/* Image number */}
                  <div
                    className="
                    absolute
                    bottom-4
                    right-4
                    rounded-full
                    bg-black/60
                    px-3
                    py-1.5
                    text-xs
                    text-white/60
                    backdrop-blur-md
                  "
                  >
                    {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
