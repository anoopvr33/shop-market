"use client";

import Image from "next/image";
import { Flame, ArrowRight } from "lucide-react";

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
    image: Imagess[0],
    title: "Classic Shirt",
    category: "Men",
  },
  {
    id: 2,
    image: Imagess[1],
    title: "Denim Jacket",
    category: "Women",
  },
  {
    id: 3,
    image: Imagess[2],
    title: "Sneakers",
    category: "Footwear",
  },
  {
    id: 4,
    image: Imagess[3],
    title: "Watch",
    category: "Accessories",
  },
  {
    id: 5,
    image: Imagess[4],
    title: "Hoodie",
    category: "Men",
  },
  {
    id: 6,
    image: Imagess[5],
    title: "Kurti",
    category: "Women",
  },
];

export default function TrendingProducts() {
  return (
    <section className="py-5 ">
      <div className="max-w-[1400px] mx-auto px-2">
        {/* Heading */}

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory  scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-center shrink-0 w-[80%] sm:w-[60%]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4 text-amber-950  rounded-full bg-white/90 px-3 py-1 text-xs">
                    🔥 Trending
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-neutral-500 uppercase">
                    {product.category}
                  </p>

                  <h3 className="font-semibold">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 xl:grid-cols-6 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[1/1] overflow-hidden rounded-3xl bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes=""
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 text-amber-950  rounded-full bg-white/90 px-3 py-1 text-xs">
                  🔥 Trending
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase text-neutral-500">
                  {product.category}
                </p>

                <h3 className="font-semibold">{product.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
