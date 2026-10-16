import { Link } from "react-router-dom";
import { priceFormatter } from "../utils";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import customApi from "../api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";

const CardProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <div className="card bg-base-300 shadow-sm" key={item._id}>
      <figure className="h-48 overflow-hidden bg-base-200">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-2"
        />
      </figure>
      <div className="card-body p-4 gap-1">
        {user && user.role === "owner" && (
          <div className="flex justify-end gap-x-3">
            <FaTrash
              onClick={async () => {
                await customApi.delete(`/product/${item._id}`);
                toast.info("Produk berhasil dihapus");
                revalidate();
              }}
              className="text-red-500 cursor-pointer"
            />
            <Link to={`/products/${item._id}/edit`}>
              <FaPencilAlt className="text-info cursor-pointer" />
            </Link>
          </div>
        )}
        <h2 className="card-title text-base line-clamp-1">{item.name}</h2>
        <p className="text-sm font-semibold text-primary">
          {priceFormatter(item.price)}
        </p>
        <p className="text-xs text-base-content/70 line-clamp-2">
          {item.description}
        </p>
        <div className="card-actions justify-end mt-2">
          <Link to={`/products/${item._id}`} className="btn btn-primary btn-sm">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
