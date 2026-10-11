import { useLoaderData } from "react-router-dom";
import customApi from "../api";
import CardProduct from "../components/CardProduct";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customApi.get("/product", { params: params });

  const products = data.data;
  const pagination = data.pagination;

  return { products, params, pagination };
};

const ProductView = () => {
  const { products, pagination } = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Filter />
      <div className="flex justify-between items-center border-b-2 border-primary py-2 mb-5">
        <h2 className="text-2xl font-bold">All Products</h2>
        <h3 className="text-primary font-bold text-right">
          Total: {pagination.totalProduct} Product
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {!products.length ? (
          <p className="col-span-full text-center text-xl mt-5">
            Produk tidak ditemukan
          </p>
        ) : (
          products.map((item) => <CardProduct key={item._id} item={item} />)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductView;
