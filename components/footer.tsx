"use client";

import Link from "next/link";
import { ScanFace } from "lucide-react";
import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Stay Updated
            </h2>

            <p className="mt-2 text-neutral-400 max-w-md">
              Subscribe to receive exclusive offers, new arrivals,
              and fashion inspiration directly in your inbox.
            </p>
          </div>

          <div className="flex w-full lg:w-auto rounded-full bg-white overflow-hidden max-w-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 outline-none text-black"
            />

            <button className="bg-black text-white px-8 hover:bg-neutral-800 transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-white">
            ShopEase
          </h2>

          <p className="mt-5 text-neutral-400 leading-7 max-w-md">
            Discover premium fashion for men, women, and kids.
            Shop the latest trends with fast delivery and secure
            payments.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black transition flex items-center justify-center">
              {/* <Facebook size={18} /> */}
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </button>

            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black transition flex items-center justify-center">
              {/* <Instagram size={18} /> */}
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </button>

            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black transition flex items-center justify-center">
              {/* <Twitter size={18} /> */}
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </button>

            <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black transition flex items-center justify-center">
              {/* <Youtube size={18} /> */}
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </button>

          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-5">
            Shop
          </h3>

          <div className="space-y-3">
            <Link href="#">Men</Link><br />
            <Link href="#">Women</Link><br />
            <Link href="#">Kids</Link><br />
            <Link href="#">Accessories</Link><br />
            <Link href="#">New Arrivals</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-5">
            Support
          </h3>

          <div className="space-y-3">
            <Link href="#">Help Center</Link><br />
            <Link href="#">Track Order</Link><br />
            <Link href="#">Returns</Link><br />
            <Link href="#">Shipping</Link><br />
            <Link href="#">FAQs</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-neutral-400">

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              Kochi, Kerala
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              +91 98765 43210
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              support@shopease.com
            </div>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookies</Link>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-11 h-11 rounded-full bg-white text-black hover:scale-110 transition flex items-center justify-center"
          >
            <ArrowUp size={18} />
          </button>

        </div>
      </div>
    </footer>
  );
}