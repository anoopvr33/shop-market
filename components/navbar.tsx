"use client";

import {
  MapPin,
  Search,
  Mail,
  MessageCircle,
  ShoppingBag,
  Home,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("products")?.toString().trim();

    if (!search) return;

    router.push(`/items?products=${encodeURIComponent(search)}`);
  };

  return (
    <header className="w-full bg-black pt-3 text-white md:pt-5">
      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        {/* ================= TOP ROW ================= */}

        <div className="flex h-14 items-center gap-3 md:h-20 md:gap-6">
          {/* Logo */}

          <div className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3">
            <Image
              src="/favicon.ico"
              width={42}
              height={42}
              alt="ShopEase Logo"
              className="h-9 w-9 rounded-xl md:h-[42px] md:w-[42px]"
            />

            <div className="hidden min-[400px]:block">
              <h2 className="text-lg font-bold md:text-xl">ShopEase</h2>

              <p className="text-[10px] text-neutral-500 md:text-xs">
                Fashion Store
              </p>
            </div>
          </div>

          {/* Location - Desktop */}

          <button className="hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/5 lg:flex">
            <MapPin size={18} />

            <div className="text-left">
              <p className="text-xs text-neutral-500">Current location</p>

              <p className="text-sm font-semibold">Kochi, Kerala</p>
            </div>
          </button>

          {/* Desktop Search */}

          <div className="hidden flex-1 md:block">
            <form
              onSubmit={handleSearch}
              className="flex h-12 items-center gap-3 rounded-full border border-white/20 bg-[#111111] px-5 transition focus-within:border-white/40"
            >
              <Search size={20} className="shrink-0 text-neutral-400" />

              <input
                type="text"
                name="products"
                placeholder="Search products, brands, categories..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
              />
            </form>
          </div>

          {/* Right Side */}

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            {/* Sign In */}

            <button
              className="
                flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-full
                px-3
                transition
                hover:bg-white/10
                md:h-12
                md:px-5
              "
            >
              <Mail size={18} />

              <span className="hidden font-medium md:block">Sign In</span>
            </button>

            {/* Chat */}

            <button
              onClick={() => router.push("/")}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition
                hover:bg-white/10
                md:h-12
                md:w-12
              "
            >
              <Home size={20} />
            </button>

            <button
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition
                hover:bg-white/10
                md:h-12
                md:w-12
              "
            >
              <MessageCircle size={20} />
            </button>
            <button onClick={() => router.push("/becomeSeller")}>
              {" "}
              Become Seller{" "}
            </button>

            {/* Cart */}

            <button
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                md:h-12
                md:w-12
              "
            >
              <ShoppingBag size={19} />

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[10px]
                  font-semibold
                  text-white
                "
              >
                2
              </span>
            </button>
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        <div className="pb-3 md:hidden">
          <div
            className="
              flex
              h-11
              w-full
              items-center
              gap-3
              rounded-full
              border
              border-white/20
              bg-[#111111]
              px-4
              transition
              focus-within:border-white/40
            "
          >
            <Search size={19} className="shrink-0 text-neutral-400" />

            <input
              type="text"
              placeholder="Search products, brands..."
              className="
                min-w-0
                flex-1
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-neutral-500
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
}
