import { useSelector } from "react-redux";
import CartListItems from "./CartListItems";

const CartList = () => {
  const carts = useSelector((state) => state.cartState.CartItems);

  return (
    <div>
      {carts.map((item) => {
        return <CartListItems key={item.cartId} cartItem={item} />;
      })}
    </div>
  );
};

export default CartList;
