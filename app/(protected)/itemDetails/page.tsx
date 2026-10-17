import Navbar from "@/components/navbar";
import ProductDetails from "@/components/productDetails";
import RelatedItems from "@/components/relatedItems";
import React from "react";

export default function ItemDetails() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050505]">
      <Navbar></Navbar>
      <ProductDetails></ProductDetails>
      <RelatedItems></RelatedItems>
    </div>
  );
}

// export default ItemDetails;
