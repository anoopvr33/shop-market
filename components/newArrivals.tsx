"use client";

import Image from "next/image";
import { Sparkles, ShoppingBag, Heart, ArrowRight } from "lucide-react";

// import { Imagess } from "@/constants/images"; // Your image array
import { Imagess } from "@/constants/images";
const products = [
  {
    id: 1,
    image: Imagess[0],
    title: "Premium Cotton Shirt",
    brand: "Allen Solly",
    price: "₹1,499",
    isNew: true,
  },
  {
    id: 2,
    image: Imagess[1],
    title: "Slim Fit Jeans",
    brand: "Levi's",
    price: "₹2,299",
    isNew: true,
  },
  {
    id: 3,
    image: Imagess[2],
    title: "Running Sneakers",
    brand: "Nike",
    price: "₹4,999",
    isNew: true,
  },
  {
    id: 4,
    image: Imagess[3],
    title: "Casual Hoodie",
    brand: "H&M",
    price: "₹2,199",
    isNew: true,
  },
  {
    id: 5,
    image: Imagess[4],
    title: "Classic Watch",
    brand: "Titan",
    price: "₹3,799",
    isNew: true,
  },
  {
    id: 6,
    image: Imagess[5],
    title: "Oversized T-Shirt",
    brand: "Zara",
    price: "₹999",
    isNew: true,
  },
];

export default function NewArrivals() {
  return (
    <section className="py-5 bg-black">
      <div className="max-w-350 mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-medium">
              <Sparkles size={16} />
              New Arrivals
            </div>

            <h2 className="mt-4 text-4xl font-bold">
              Fresh Styles Just Dropped
            </h2>

            <p className="mt-2 text-neutral-500">
              Explore the latest collections added this week.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 hover:gap-3 transition">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Carousel */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[280px] group"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="100"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 rounded-full bg-black text-white px-3 py-1 text-xs font-semibold">
                    NEW
                  </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1d193162] backdrop-blur flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                  <Heart size={18} />
                </button>

                {/* Add to Cart */}
                <button className="absolute bottom-4 left-4 right-4 rounded-full bg-white text-black py-3 flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-neutral-500">{product.brand}</p>

                <h3 className="mt-1 font-semibold line-clamp-1">
                  {product.title}
                </h3>

                <p className="mt-2 text-xl font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
