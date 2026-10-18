export default function ImageCollage() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-3",
      time: "2 hrs ago",
      price: [2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1723568617048-8ba7f42e5fec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHJlc3NlcyUyMG1lbnN8ZW58MHx8MHx8fDA%3D",
      span: "md:col-span-2",
      time: "2 hrs ago",
      price: [1599, 2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-4",
      time: "2 hrs ago",
      price: [2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1744312220338-67a6f8cf08e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8",
      span: "md:col-span-3",
      time: "2 hrs ago",
      price: [1599, 2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-7",
      time: "2 hrs ago",
      price: [1599, 2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1676236306466-25ba882070b3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      span: "md:col-span-2",
      time: "2 hrs ago",
      price: [1599, 2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1685703203919-0c2cfc893c60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D",
      span: "md:col-span-3",
      time: "2 hrs ago",
      price: [1599, 2499],
      seller: {
        name: "Urban Trends",
        avatar: "/favicon.ico",
      },
    },
  ];

  return (
    <section className="w-full h-auto mb-10 flex items-start justify-center bg-black py-5 px-3 md:px-0">
      <div className="w-full max-w-[1400px] grid grid-cols-3 md:grid-cols-12 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            className={`${img.span} relative aspect-[3/4] md:aspect-auto md:h-64 overflow-hidden rounded-xl group ${
              i >= 6 ? "hidden md:block" : "" // Keeps 2 rows (6 cards) max on mobile 3-column grid
            }`}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

            {/* Seller - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex absolute top-3 left-3 items-center gap-2">
              <img
                src={img.seller.avatar}
                alt={img.seller.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />

              <div>
                <p className="text-white text-sm font-semibold leading-none">
                  {img.seller.name}
                </p>
                <p className="text-white/70 text-xs">Verified Seller</p>
              </div>
            </div>

            {/* Time */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/60 backdrop-blur-md text-white text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              {img.time}
            </div>

            {/* Price */}
            <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/95 backdrop-blur text-black text-xs md:text-sm font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full">
              ₹{" "}
              {img.price.length === 1
                ? img.price[0].toLocaleString()
                : `${img.price[0].toLocaleString()} - ₹ ${img.price[1].toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
