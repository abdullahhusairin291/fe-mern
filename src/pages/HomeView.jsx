import customApi from "../api";
import CardProduct from "../components/CardProduct";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";

export const loader = async () => {
  try {
    const { data } = await customApi.get("/product?limit=4");
    return { products: data.data ?? [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
};

const HomeView = () => {
  const { products } = useLoaderData();

  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-b-2 border-primary py-2 mt-10 mb-5">
          <h2 className="text-2xl font-bold">Our Products</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((item) => (
            <CardProduct key={item.id ?? item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeView;
