import Navbar from "@/components/navbar";
import ProductMasonry from "@/components/productItems";
import ShopProfileHeader from "@/components/shopHead";
import ShopProductGrid from "@/components/shopProduct";
import React from "react";

const ShopProfile = () => {
  return (
    <div>
      {" "}
      <Navbar></Navbar>
      <ShopProfileHeader></ShopProfileHeader>
       {/* <ProductMasonry></ProductMasonry> */}
      <ShopProductGrid></ShopProductGrid>
    </div>
  );
};

export default ShopProfile;
