import { useEffect } from "react";
import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import customApi from "../api";
import { toast } from "react-toastify";
import { clearCartItem } from "../features/cartSlice";
import { redirect, useNavigate } from "react-router-dom";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
    );
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  return null;
};

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const cart = useSelector((state) => state.cartState.CartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    const newArrayCart = cart.map((item) => ({
      product: item.productId,
      quantity: item.amount,
    }));

    try {
      const res = await customApi.post("/order", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        cartItems: newArrayCart,
      });

      const snapToken = res.data.token;

      window.snap.pay(snapToken.token, {
        onSuccess: function (result) {
          dispatch(clearCartItem());
          navigate("/orders");
        },
        onPending: function (result) {
          console.log(result);
          alert(
            "Waiting for payment! Transaction ID: " + result.transaction_id,
          );
        },
        onError: function (result) {
          console.log(result);
          alert("Payment failed! Please try again.");
        },
      });
      toast.success("Order created successfully!");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-8 py-8">
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-bold capitalize tracking-wide">
          Checkout
        </h2>
        <p className="text-sm opacity-70 mt-1">
          Lengkapi data diri untuk menyelesaikan pesanan.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 mt-8 items-start">
        <div className="lg:col-span-8">
          <form
            method="post"
            className="bg-base-200 rounded-2xl p-6 md:p-8 shadow-sm"
            onSubmit={handleCheckout}
          >
            <h3 className="text-lg font-semibold mb-5">Data Pemesan</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <FormInput label="First Name" name="firstName" type="text" />
              <FormInput label="Last Name" name="lastName" type="text" />
              <FormInput
                label="Email"
                name="email"
                type="email"
                def={user?.email}
              />
              <FormInput label="Phone Number" name="phone" type="tel" />

              <button
                type="submit"
                className="btn btn-primary md:col-span-2 mt-2"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-6">
          <CartTotal />
        </div>
      </div>
    </section>
  );
};

export default CheckoutView;
