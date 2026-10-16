import { Link, useParams } from "react-router-dom";
import customApi from "../api";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { generateSelectAmount, priceFormatter } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  // store
  const dispatch = useDispatch();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const isOutOfStock = !product?.stock || product.stock < 1;

  const handleCart = () => {
    if (isOutOfStock) return;
    if (amount > product.stock) return;
    dispatch(addItem({ product: productCart }));
  };

  const productData = async () => {
    const { data } = await customApi.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6">
      <Link to="/products" className="btn btn-ghost btn-sm mb-4 gap-2">
        <FaArrowLeft /> Back
      </Link>

      <div className="card bg-base-100 shadow-sm sm:card-side">
        <figure className="w-full shrink-0 bg-base-200 p-6 sm:w-64 lg:w-72">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-64 w-full object-contain drop-shadow-lg sm:h-72"
          />
        </figure>

        <div className="card-body gap-3 p-5 sm:p-6">
          <h2 className="card-title text-xl sm:text-2xl">{product?.name}</h2>

          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary">
              {priceFormatter(product?.price)}
            </span>
            <span className="badge badge-secondary">
              In Stock {product?.stock}
            </span>
          </div>

          <p className="text-sm leading-relaxed sm:text-base">
            {product?.description}
          </p>

          <div className="card-actions mt-2 flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-end">
            <div className="form-control w-full sm:w-32">
              <label htmlFor="amount" className="label py-1">
                <span className="label-text text-sm font-medium capitalize">
                  Amount
                </span>
              </label>
              <select
                id="amount"
                name="amount"
                className="select select-bordered w-full"
                onChange={handleAmount}
                disabled={isOutOfStock}
              >
                {generateSelectAmount(product.stock)}
              </select>
            </div>

            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleCart}
              disabled={isOutOfStock}
            >
              <FaPlus /> {isOutOfStock ? "Stok Habis" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
