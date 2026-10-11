import { priceFormatter, generateSelectAmount } from "../utils";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cartSlice";

const CartListItems = ({ cartItem }) => {
  const { cartId, name, price, image, amount, stock } = cartItem;
  const dispatch = useDispatch();

  const handleChangeAmount = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  const removeProductItem = () => {
    dispatch(removeItem({ cartId }));
  };

  return (
    <article
      key={cartId}
      className="flex gap-4 border-b border-base-300 py-6 last:border-b-0"
    >
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-base-200 sm:h-32 sm:w-32">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-1"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">{name}</h3>
            <p className="text-gray-600">Quantity: {amount}</p>
          </div>
          <span className="whitespace-nowrap text-lg font-semibold">
            {priceFormatter(price)}
          </span>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <select
            name="amount"
            className="select select-bordered select-sm w-24"
            value={amount}
            onChange={handleChangeAmount}
          >
            {generateSelectAmount(stock)}
          </select>

          <button
            className="btn btn-secondary btn-sm btn-square"
            aria-label="Hapus dari keranjang"
            onClick={removeProductItem}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartListItems;
