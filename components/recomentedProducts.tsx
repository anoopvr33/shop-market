"use client";

import Image from "next/image";
import { Sparkles, Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const Imagess = [
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1778671394516-8270eac13c42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1630167146816-e1f4ff99c00c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const products = [
  {
    id: 1,
    title: "Premium Linen Shirt",
    brand: "Allen Solly",
    price: "₹1,899",
    rating: 4.8,
    image: Imagess[0],
  },
  {
    id: 2,
    title: "Regular Fit Jeans",
    brand: "Levi's",
    price: "₹2,499",
    rating: 4.7,
    image: Imagess[1],
  },
  {
    id: 3,
    title: "Running Sneakers",
    brand: "Nike",
    price: "₹5,999",
    rating: 4.9,
    image: Imagess[2],
  },
  {
    id: 4,
    title: "Classic Analog Watch",
    brand: "Titan",
    price: "₹3,299",
    rating: 4.6,
    image: Imagess[3],
  },
  {
    id: 5,
    title: "Oversized Hoodie",
    brand: "H&M",
    price: "₹2,199",
    rating: 4.8,
    image: Imagess[4],
  },
];

export default function RecommendedProducts() {
  return (
    <section className="py-10 bg-gradient-to-b from-[#1e1b2d] ">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-4 py-2 text-sm font-medium">
              <Sparkles size={16} />
              Recommended For You
            </div>

            <h2 className="mt-4 text-4xl font-bold">Picks You'll Love</h2>

            <p className="mt-2 text-neutral-500">
              Hand-picked products based on your interests.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 hover:gap-3 transition">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Products */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[280px] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Recommendation Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-black/90 backdrop-blur px-3 py-1 text-xs font-medium">
                  ✨ For You
                </div>

                {/* Wishlist */}
                <button className="absolute right-4 top-4 w-10 h-10 rounded-full bg-[#2d1f3946] backdrop-blur flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                  <Heart size={18} />
                </button>

                {/* Add to Cart */}
                <button className="absolute bottom-4 left-4 right-4 rounded-full bg-black text-white py-3 flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-neutral-500">{product.brand}</p>

                <h3 className="mt-1 font-semibold line-clamp-1">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-xl">{product.price}</span>

                  {/* <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium text-neutral-700">
                      {product.rating}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
