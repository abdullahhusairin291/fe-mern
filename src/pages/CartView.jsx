import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const CartView = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Please log in</h1>
        <p className="text-lg text-gray-600">
          You need to be logged in to view your cart.
        </p>
      </div>
    );
  }

  if (numItemInCart === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-lg text-gray-600">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3">
      <div className="mt-5 border-b border-primary pb-5">
        <h2 className="text-2xl font-bold capitalize">Your Cart</h2>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartList />
        </div>

        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Log in to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartView;
