"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Truck,
  Share2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Imagess } from "@/constants/images";

const shop = {
  name: "Urban Threads",
  username: "@urbanthreads",
  profile: Imagess[5],

  verified: true,

  description: "Premium fashion & lifestyle products for everyday style.",

  email: "urbanthreads@gmail.com",

  phone: "+91 98765 43210",

  address: "Thrissur, Irinjalakuda, Kerala, India - 680701",

  location: "Irinjalakuda, Kerala",

  deliveryAvailable: true,
};

export default function ShopProfileHeader() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="bg-black px-3 py-2 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN CARD */}
        <div className="relative overflow-hidden    shadow-2xl">
          {/* ================= DESKTOP 2 COLUMNS ================= */}

          <div className="flex flex-col lg:grid lg:grid-cols-[1.35fr_1fr]">
            {/* ================================================= */}
            {/* LEFT SECTION */}
            {/* ================================================= */}

            <div className="relative  bg-gradient-to-br from-[#131313]">
              {/* ================= MOBILE IMAGE ================= */}

              <div className="relative block h-[200px] w-full lg:hidden">
                <Image
                  src={shop.profile}
                  alt={shop.name}
                  fill
                  sizes=""
                  priority
                  className="object-cover"
                />

                {/* Gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Verified */}

                {shop.verified && (
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6863a5] shadow-lg">
                    <CheckCircle2 size={27} />
                  </div>
                )}

                {/* Mobile Name */}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm text-white/60">{shop.username}</p>

                  <h1 className="mt-1 text-2xl font-bold text-white">
                    {shop.name}
                  </h1>

                  <p className="mt-2 text-sm text-white/70">
                    {shop.description}
                  </p>
                </div>
              </div>

              {/* ================= DESKTOP PROFILE ================= */}

              <div className="hidden lg:block">
                {/* Profile Image */}

                <div className="absolute left-10 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <Image
                      src={shop.profile}
                      alt={shop.name}
                      width={230}
                      height={230}
                      className="
                        h-[240px]
                        w-[240px]
                        rounded-full
                        border-[5px]
                        border-[#2f2f30]
                        object-cover
                        shadow-2xl
                      "
                    />

                    {/* Verified */}

                    {shop.verified && (
                      <div className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#6863a5] shadow-xl">
                        <CheckCircle2 size={30} strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Shop Content */}

                <div className="ml-[270px] px-8 py-14">
                  {/* <p className="text-4xl font-bold text-white">@</p> */}

                  <h1 className="mt-2 text-3xl font-bold text-white">
                    {shop.name}
                  </h1>

                  <p className="mt-1 text-sm text-white/60">{shop.username}</p>

                  <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                    {shop.description}
                  </p>

                  {/* Delivery */}

                  <div className="mt-6 flex items-center gap-3">
                    {shop.deliveryAvailable ? (
                      <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200">
                        <Truck size={16} />
                        Delivery Available
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-medium text-red-200">
                        Delivery Unavailable
                      </div>
                    )}

                    <div className="flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-sm text-white/70">
                      <MapPin size={15} />
                      {shop.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT SECTION */}
            {/* ================================================= */}

            <div className=" py-2 md:p-8 lg:flex lg:flex-col lg:justify-between">
              {/* ================= MOBILE DELIVERY ================= */}

              <div className="mb-2 flex items-center justify-between md:hidden">
                <p className="rounded-2xl py-2 text-sm text-white/70">
                  Delivery Availabe ✓
                </p>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="
        rounded-full
        bg-white/10
        px-4
        py-2
        text-xs
        font-medium
        text-white
        transition
        hover:bg-white/20
      "
                >
                  {showDetails ? "View Less" : "View More"}
                </button>
              </div>

              {/* ================= CONTACT DETAILS ================= */}

              <div
                className={`
      space-y-4
      ${showDetails ? "block" : "hidden"}
      md:block
    `}
              >
                {/* EMAIL */}

                <a
                  href={`mailto:${shop.email}`}
                  className="group flex items-start gap-4"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7771b9]/20 text-[#f2f1ff]">
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/40">EMAIL</p>

                    <p className="mt-1 truncate text-sm text-[#f5f4ff] transition group-hover:text-white md:text-base">
                      {shop.email}
                    </p>
                  </div>
                </a>

                {/* PHONE */}

                <a
                  href={`tel:${shop.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-4"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7771b9]/20 text-[#e9e8f8]">
                    <Phone size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">PHONE</p>

                    <p className="mt-1 text-sm text-[#eeedfb] transition group-hover:text-white md:text-base">
                      {shop.phone}
                    </p>

                    <p className="mt-1 text-xs text-white/40">Tap to call</p>
                  </div>
                </a>

                {/* ADDRESS */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Irinjalakuda+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7771b9]/20 text-[#f1f0ff]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">SHOP ADDRESS</p>

                    <p className="mt-1 text-sm leading-6 text-[#f1f0fe] md:text-base">
                      {shop.address}
                    </p>

                    <p className="mt-1 text-xs text-[#aaa5ed]">
                      Open in Maps →
                    </p>
                  </div>
                </a>
              </div>

              {/* ================= ACTIONS ================= */}

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-5">
                <button
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
                  Visit Shop
                </button>

                <div className="flex items-center gap-2">
                  <button
                    className="
          flex
          h-11
          items-center
          gap-2
          rounded-full
          bg-[#1f1d31]
          px-5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#8580c9]
        "
                  >
                    <MessageCircle size={17} />
                    Message
                  </button>

                  <button
                    className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white/10
          text-white
          transition
          hover:bg-white/20
        "
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
