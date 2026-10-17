"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";

const Imagess = [
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1778671394516-8270eac13c42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1630167146816-e1f4ff99c00c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const searches = ["Shirts", "Jeans", "Sneakers", "Hoodies", "Watches"];

const products = [
  {
    id: 1,
    title: "Premium White Shirt",
    category: "Shirts",
    price: "₹1,299",
    image: Imagess[0],
  },
  {
    id: 2,
    title: "Slim Fit Blue Jeans",
    category: "Jeans",
    price: "₹2,099",
    image: Imagess[1],
  },
  {
    id: 3,
    title: "Running Sneakers",
    category: "Sneakers",
    price: "₹3,499",
    image: Imagess[2],
  },
  {
    id: 4,
    title: "Oversized Hoodie",
    category: "Hoodies",
    price: "₹1,899",
    image: Imagess[3],
  },
  {
    id: 5,
    title: "Classic Watch",
    category: "Watches",
    price: "₹4,299",
    image: Imagess[4],
  },
  {
    id: 6,
    title: "Formal Shirt",
    category: "Shirts",
    price: "₹1,499",
    image: Imagess[5],
  },
];

export default function RecentSearchProducts() {
  const [selected, setSelected] = useState("Shirts");

  const filtered = products.filter((item) => item.category === selected);

  return (
    <section className="py-5 ">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-medium">
              <Search size={16} />
              Based on Your Recent Searches
            </div>

            <h2 className="mt-4 text-4xl font-bold">
              You searched for "{selected}"
            </h2>

            <p className="mt-2 text-neutral-500">
              Products related to your recent interests.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 hover:gap-3 transition-all font-medium">
            See All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Search Chips */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {searches.map((item) => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`rounded-full px-5 py-2 whitespace-nowrap transition
                ${
                  selected === item
                    ? "bg-black text-white"
                    : "bg-white text-black border hover:bg-neutral-100"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[260px] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 text-amber-800 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium">
                  🔍 {selected}
                </div>

                <button className="absolute bottom-4 left-4 right-4 rounded-full bg-black text-white py-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  View Product
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold line-clamp-1">{product.title}</h3>

                <p className="mt-2 font-bold text-lg">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
