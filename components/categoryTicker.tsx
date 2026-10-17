"use client";

const row1 = [
  "Shirts",
  "Jeans",
  "Kurtis",
  "T-Shirts",
  "Shoes",
  "Watches",
  "Innerwear",
  "Jackets",
];

const row2 = [
  "Sarees",
  "Hoodies",
  "Blazers",
  "Shorts",
  "Caps",
  "Bags",
  "Kids Wear",
  "Sportswear",
];

function Row({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const data = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          reverse ? "animate-scrollReverse" : "animate-scroll"
        }`}
      >
        {data.map((item, i) => (
          <button
            key={i}
            className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-3 text-white text-sm font-medium shadow-lg hover:bg-white/20 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CategoryTicker() {
  return (
    <section className="relative w-full py-1 bg-[#000000] space-y-3">
      <Row items={row1} />
      {/* <Row items={row2} reverse /> */}
      {/* <Row items={row1} /> */}
    </section>
  );
}