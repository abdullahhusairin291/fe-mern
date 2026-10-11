import { useEffect, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();
  const carouselRef = useRef(null);

  // duplikat array biar ada "sambungan" buat di-loop
  const loopedProducts = [...products, ...products];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || products.length === 0) return;

    const interval = setInterval(() => {
      const itemWidth = el.firstChild?.offsetWidth ?? 0;
      const gap = 16; // sesuai space-x-4
      const scrollAmount = itemWidth + gap;
      const oneSetWidth = scrollAmount * products.length;

      el.scrollTo({
        left: el.scrollLeft + scrollAmount,
        behavior: "smooth",
      });

      // kalau sudah lewat satu set penuh, reset diam-diam ke posisi sepadan di set pertama
      setTimeout(() => {
        if (el.scrollLeft >= oneSetWidth) {
          el.scrollTo({
            left: el.scrollLeft - oneSetWidth,
            behavior: "auto", // tanpa animasi, biar tidak kelihatan "lompat"
          });
        }
      }, 500); // tunggu smooth scroll selesai dulu
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center mx-auto max-w-6xl px-4">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Our Store
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Discover our wide range of high-quality products at unbeatable
            prices.
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="hidden md:flex carousel carousel-center bg-neutral rounded-box space-x-4 p-4 w-full"
        >
          {loopedProducts.map((item, index) => (
            <div
              key={`${item.id ?? item._id}-${index}`}
              className="carousel-item"
            >
              <div className="w-64 bg-gray-300 rounded-lg p-4">
                <img alt={item.name} src={item.image} className="rounded-box" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
