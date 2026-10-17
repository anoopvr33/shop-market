"use client";

import Image from "next/image";
import { Heart, Clock3, Share2 } from "lucide-react";
import { Imagess } from "@/constants/images";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    image: Imagess[0],
    profile: Imagess[5],
    shop: "Urban Threads",
    time: "3 hrs ago",
    title: "Premium Cotton Shirt",
    price: 1499,
    oldPrice: 1999,
  },
  {
    id: 2,
    image: Imagess[1],
    profile: Imagess[3],
    shop: "Style Hub",
    time: "1 hr ago",
    title: "Casual Hoodie",
    price: 2299,
  },
  {
    id: 3,
    image: Imagess[2],
    profile: Imagess[1],
    shop: "Denim Co.",
    time: "Yesterday",
    title: "Blue Jeans",
    price: 1899,
    oldPrice: 2499,
  },
  {
    id: 4,
    image: Imagess[3],
    profile: Imagess[2],
    shop: "Nike Store",
    time: "2 hrs ago",
    title: "Running Shoes",
    price: 4999,
  },
  {
    id: 5,
    image: Imagess[4],
    profile: Imagess[5],
    shop: "Classic Wear",
    time: "Today",
    title: "Formal Shirt",
    price: 1599,
  },
  {
    id: 6,
    image: Imagess[5],
    profile: Imagess[0],
    shop: "Fashion Point",
    time: "5 hrs ago",
    title: "Summer Collection",
    price: 999,
    oldPrice: 1499,
  },
  {
    id: 7,
    image: Imagess[6],
    profile: Imagess[4],
    shop: "Trendy",
    time: "30 mins ago",
    title: "Oversized T-Shirt",
    price: 899,
  },
  {
    id: 8,
    image: Imagess[7],
    profile: Imagess[2],
    shop: "Urban Fit",
    time: "Yesterday",
    title: "Winter Jacket",
    price: 3299,
    oldPrice: 3999,
  },
];

export default function ProductMasonry() {
  const router = useRouter();

  return (
    <section className="py-10 bg-neutral-950">
      <div className="max-w-[1400px] mx-auto px-2 md:px-0">
        {/* Pinterest Masonry */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-2">
          {products.map((product) => (
            <div key={product.id} className="mb-4 break-inside-avoid">
              <div className="rounded-3xl overflow-hidden bg-black">
                {/* Image */}
                <div
                  className="relative overflow-hidden group cursor-pointer"
                  onClick={() => router.push(`/itemDetails/${product.id}`)}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={700}
                    height={1000}
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                  {/* Seller */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <Image
                      src={product.profile}
                      alt={product.shop}
                      width={42}
                      height={42}
                      className="rounded-full border-2 border-white object-cover w-10 h-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/shopPage");
                      }}
                    />

                    <div>
                      <h4 className="text-white text-sm font-semibold">
                        {product.shop}
                      </h4>

                      <p className="text-white/70 text-xs">Verified Seller</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="absolute bottom-2 left-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-xs text-white">
                    ⏱ {product.time}
                  </div>

                  {/* Floating Actions */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-11 h-11 hidden rounded-full bg-black/60 backdrop-blur-md border border-white/10 sm:flex items-center justify-center text-white hover:bg-red-500 transition-all hover:scale-110"
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </div>

                {/* Bottom */}
                <div className="p-4">
                  <h4 className="text-white text-sm font-semibold line-clamp-2">
                    {product.title}
                  </h4>

                  <div className="mt-3 flex justify-between items-center gap-2">
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-white text-black px-3 py-1 text-sm font-bold">
                        ₹{product.price.toLocaleString()}
                      </span>

                      {product.oldPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          ₹{product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </span>
                    <button className="w-11 h-11 hidden rounded-full bg-black/60 backdrop-blur-md border border-white/10 sm:flex items-center justify-center text-white hover:bg-sky-500 transition-all hover:scale-110">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
