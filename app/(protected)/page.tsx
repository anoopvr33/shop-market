import CategoryTicker from "@/components/categoryTicker";
import ContinueBrowsing from "@/components/continueBrowsing";
import Footer from "@/components/footer";
import ImageCollage from "@/components/imageCollage";
import Navbar from "@/components/navbar";
import NewArrivals from "@/components/newArrivals";
import RecentSearchProducts from "@/components/recentSearchProducts";
import RecommendedProducts from "@/components/recomentedProducts";
import TrendingProducts from "@/components/trendingProduct";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505]">
      <Navbar></Navbar>
      <CategoryTicker></CategoryTicker>
      <ImageCollage></ImageCollage>
      <TrendingProducts></TrendingProducts>
      <ContinueBrowsing></ContinueBrowsing>
      <RecentSearchProducts></RecentSearchProducts>
      <RecommendedProducts></RecommendedProducts>
      <NewArrivals></NewArrivals>
      <Footer></Footer>
    </main>
  );
}
