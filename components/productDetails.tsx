"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Zap,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import { Images } from "@/constants/images";
const Imagess = [
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1778671394516-8270eac13c42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1630167146816-e1f4ff99c00c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1778671394516-8270eac13c42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const product = {
  id: 1,

  title: "Premium Oversized Cotton Shirt",

  images: [Imagess[0], Imagess[1], Imagess[2], Imagess[3]],

  price: 1499,
  oldPrice: 1999,

  description:
    "A premium everyday shirt made from soft cotton fabric. Designed with a relaxed fit and clean modern styling for everyday comfort.",

  shop: {
    name: "Urban Threads",
    profile: Imagess[6],
    verified: true,
  },

  sizes: ["S", "M", "L", "XL", "XXL"],

  colors: [
    {
      name: "Black",
      value: "#111111",
    },
    {
      name: "White",
      value: "#f5f5f5",
    },
    {
      name: "Blue",
      value: "#334155",
    },
  ],

  delivery: "Delivery available to your location",
};

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  return (
    <section className="min-h-600px  bg-neutral-950 py-4">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-10 xl:gap-16">
          {/* ================= IMAGE SECTION ================= */}

          <div className="lg:sticky   lg:top-24 lg:self-start">
            {/* shop name */}
            <div className="flex items-center md:hidden justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={product.shop.profile}
                  alt={product.shop.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{product.shop.name}</h3>

                    {product.shop.verified && (
                      <span className="text-xs bg-zinc-600 text-white px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neutral-500">
                    Fashion & Lifestyle
                  </p>
                </div>
              </div>


            </div>

            {/* Main Image */}
            <div className="relative rounded-[5px] w-full h-[50vh] lg:h-[60vh] overflow-hidden  bg-neutral-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />

              {/* Previous */}
              <button
                onClick={previousImage}
                className="absolute left-0 top-1/2 -translate-y-1/2
                w-8 h-15 rounded-r-2xl 
                bg-black/50 backdrop-blur
                flex items-center justify-center
                hover:scale-105 transition" 
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2
                w-8 h-15 rounded-l-2xl
                bg-black/50 backdrop-blur
                flex items-center justify-center
                hover:scale-105 transition"
              >
                <ChevronRight size={20} />
              </button>

              {/* Wishlist */}
              <button
                className="absolute top-5 right-5
                w-11 h-11 rounded-full
                bg-black/40 backdrop-blur
                flex items-center justify-center
                hover:bg-black hover:text-white transition"
              >
                <Heart size={19} />
              </button>
            </div>

            {/* Thumbnails */}

            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    relative shrink-0
                    w-20 h-20
                    
                    overflow-hidden
                    border-2
                    transition
                    ${
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= DETAILS SECTION ================= */}

          <div className="py-2 col-span-2 lg:py-8">
            {/* Shop */}

            <div className=" hidden md:flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Image
                  src={product.shop.profile}
                  alt={product.shop.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{product.shop.name}</h3>

                    {product.shop.verified && (
                      <span className="text-xs bg-zinc-600 text-white px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neutral-500">
                    Fashion & Lifestyle
                  </p>
                </div>
              </div>

              {/* <button className="px-2 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:bg-black hover:text-white transition">
                Visit Shop
              </button> */}
            </div>

            {/* Product Title */}

            <h1 className="text-[20px] md:text-3xl font-bold tracking-tight">
              {product.title}
            </h1>

            {/* Price */}

            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-bold">
                ₹{product.price.toLocaleString()}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
              )}

              {product.oldPrice && (
                <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Description */}

            <p className="mt-6 text-neutral-600 leading-7 max-w-xl">
              {product.description}
            </p>

            {/* Divider */}

            <div className="border-t border-zinc-700 my-4" />


            {/* Size */}

            <div className="mt-2">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Available Sizes</h3>

                {/* <button className="text-sm underline">Size Guide</button> */}
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    // onClick={() => setSelectedSize(size)}
                    className={`
                      w-14 h-12 rounded-xl border border-zinc-700
                      font-medium transition
                    
                           
                           "border-neutral-300 hover:border-black"
                     
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>


            
            <button
              className="
              mt-4
                  flex-1
                  h-14
                  rounded-full
                  bg-white
                  text-black
                  flex items-center
                  justify-center gap-2
                  font-semibold
                  px-5
                  
                  hover:bg-neutral-800
                  hover:text-white
                  transition"
            >
              {" "}
              <Zap size={19} />
              Available Now{" "}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
