"use client";

import Image from "next/image";

import { Imagess } from "@/constants/images";
import ProductViewer from "./productViewer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const shopProducts = [
  {
    id: 1,
    image: Imagess[0],
    title: "Premium Cotton Shirt",
    price: 1499,
  },
  {
    id: 2,
    image: Imagess[1],
    title: "Oversized Casual Hoodie",
    price: 2299,
  },
  {
    id: 3,
    image: Imagess[2],
    title: "Classic Denim Jacket",
    price: 2999,
  },
  {
    id: 4,
    image: Imagess[3],
    title: "Slim Fit Jeans",
    price: 1899,
  },
  {
    id: 5,
    image: Imagess[4],
    title: "Relaxed Fit T-Shirt",
    price: 999,
  },
  {
    id: 6,
    image: Imagess[5],
    title: "Summer Casual Shirt",
    price: 1299,
  },
  {
    id: 7,
    image: Imagess[6],
    title: "Premium Kurti",
    price: 1799,
  },
  {
    id: 8,
    image: Imagess[7],
    title: "Streetwear Cargo",
    price: 2199,
  },
  {
    id: 9,
    image: Imagess[3],
    title: "Minimal Oversized Tee",
    price: 899,
  },
  {
    id: 10,
    image: Imagess[6],
    title: "Classic Formal Shirt",
    price: 1599,
  },
  {
    id: 11,
    image: Imagess[1],
    title: "Everyday Joggers",
    price: 1399,
  },
  {
    id: 12,
    image: Imagess[2],
    title: "Premium Linen Shirt",
    price: 1999,
  },
  {
    id: 13,
    image: Imagess[4],
    title: "Casual Summer Dress",
    price: 2499,
  },
  {
    id: 14,
    image: Imagess[6],
    title: "Classic Polo",
    price: 1199,
  },
  {
    id: 15,
    image: Imagess[1],
    title: "Wide Leg Trousers",
    price: 1699,
  },
];

export default function ShopProductGrid() {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <section className="bg-black px-3 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1400px]">
        {/* ================= HEADER ================= */}

        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#7771b9]">
              Urban Threads
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
              Shop Products
            </h2>
          </div>

          {/* <p className="hidden text-sm text-white/40 sm:block">Add</p> */}
          <div className="flex items-center gap-15">
            <button
              onClick={() => router.push("/itemPost")}
              className="
        rounded-full
        bg-white/10
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        transition
        hover:bg-white/20
      "
            >
              Add +
            </button>
            <p className="hidden text-sm text-white/40 sm:block">
              {shopProducts.length} Products
            </p>
          </div>
        </div>

        {/* ================= MASONRY GRID ================= */}

        <div
          className="
            columns-3
            gap-3

            lg:columns-5
            lg:gap-4
          "
        >
          {shopProducts.map((product, index) => (
            <div
              key={product.id}
              className="
                mb-3
                break-inside-avoid relative
                overflow-hidden
                rounded-xl

                bg-[#0e0e0e]

                lg:mb-4
                lg:rounded-2xl
              "
            >
              {/* ================= IMAGE ================= */}
              <p className="mt-1 absolute z-1 bg-gray-900/50 px-3 py-0.3 rounded right-5  text-sm font-bold text-white">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <button
                type="button"
                onClick={() => setSelectedProduct(index)}
                className="
                  group
                  relative
                  block
                  w-full
                  cursor-pointer
                  overflow-hidden
                "
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={700}
                  height={1000}
                  className="
                    block
                    h-auto
                    w-full
                    object-cover

                    transition
                    duration-500

                    group-hover:scale-105
                  "
                />
              </button>

              {/* ================= DESKTOP DETAILS ================= */}

              <div className="hidden p-3 lg:block">
                <h3 className="line-clamp-1 text-sm font-medium text-white">
                  {product.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PRODUCT VIEWER ================= */}

        <ProductViewer
          products={shopProducts}
          selectedIndex={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  );
}
