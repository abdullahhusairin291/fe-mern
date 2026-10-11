import { Link } from "react-router-dom";
import { priceFormatter } from "../utils";

const CardProduct = ({ item }) => {
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
