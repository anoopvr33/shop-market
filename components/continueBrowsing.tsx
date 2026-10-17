"use client";

import Image from "next/image";
import { Imagess } from "@/constants/images";

const viewedProducts = [
  {
    id: 1,
    title: "Classic White Shirt",
    price: "₹1,299",
    image: Imagess[0],
    viewed: "2 hours ago",
  },
  {
    id: 2,
    title: "Slim Fit Jeans",
    price: "₹2,199",
    image: Imagess[1],
    viewed: "Yesterday",
  },
  {
    id: 3,
    title: "Running Shoes",
    price: "₹3,499",
    image: Imagess[2],
    viewed: "3 days ago",
  },
  {
    id: 4,
    title: "Leather Wallet",
    price: "₹999",
    image: Imagess[3],
    viewed: "Last week",
  },
  {
    id: 5,
    title: "Oversized Hoodie",
    price: "₹1,899",
    image: Imagess[4],
    viewed: "2 weeks ago",
  },
];

export default function ContinueBrowsing() {
  return (
    <section className="py-5 bg-black text-white">
      <div className="max-w-[1400px] mx-auto px">
        <div className="mb-5">
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">
            Continue Browsing
          </span>

          {/* <h2 className="text-3xl font-bold mt-4">
            Pick up where you left off
          </h2> */}

          <p className="text-neutral-400 mt-2">
            Products you've recently explored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {viewedProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition"
            >
              {/* Content */}
              <div className="p-6">
                <p className="text-neutral-400 text-sm">👀 {product.viewed}</p>

                <h3 className="text-2xl font-bold mt-2">{product.title}</h3>

                <p className="text-neutral-400 mt-2">{product.price}</p>
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-2 p-3 pt-0">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
