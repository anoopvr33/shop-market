import CategoryTicker from "@/components/categoryTicker";
import Navbar from "@/components/navbar";
import ProductMasonry from "@/components/productItems";

export default function Items() {
  return <main className="min-h-screen overflow-hidden bg-[#050505]">
    <Navbar></Navbar>
          <CategoryTicker></CategoryTicker>
    <ProductMasonry></ProductMasonry>
  </main>;
}
