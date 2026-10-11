import { useSelector } from "react-redux";
import { priceFormatter } from "../utils";

const CartTotal = () => {
  const { cartTotal } = useSelector((state) => state.cartState);
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <p className="text-sm pb-2 flex justify-between">
          <span>Cart Total:</span>
          <span className="font-bold">{priceFormatter(cartTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
