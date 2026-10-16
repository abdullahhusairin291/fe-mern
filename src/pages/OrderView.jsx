import { Link, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormatter } from "../utils";
import customApi from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;

  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }

  const isOwner = user.role === "owner";
  const endpoint = isOwner ? "/order" : "/order/current/user";

  try {
    const { data } = await customApi.get(endpoint);
    return { orders: data.data ?? [], isOwner };
  } catch (error) {
    toast.error(error?.response?.data?.message || "Gagal memuat data pesanan");
    return { orders: [], isOwner };
  }
};

const STATUS_BADGE = {
  pending: { label: "Pending", className: "badge-info" },
  success: { label: "Success", className: "badge-success" },
  failed: { label: "Failed", className: "badge-error" },
};

const EmptyOrders = ({ isOwner }) => (
  <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
    <h1 className="text-3xl font-bold text-primary">
      {isOwner ? "Belum ada pesanan masuk" : "Pesanan kamu masih kosong"}
    </h1>
    <p className="text-base-content/70">
      {isOwner
        ? "Pesanan dari pelanggan akan muncul di sini."
        : "Kamu belum pernah melakukan pemesanan."}
    </p>
    {!isOwner && (
      <Link to="/" className="btn btn-primary">
        Mulai Belanja
      </Link>
    )}
  </section>
);

const OrderView = () => {
  const { orders, isOwner } = useLoaderData();

  if (!orders.length) return <EmptyOrders isOwner={isOwner} />;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 border-b border-base-300 pb-4">
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">
          {isOwner ? "Semua Pesanan" : "Pesanan Saya"}
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Total {orders.length} pesanan
        </p>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-sm">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="w-12">No</th>
              {isOwner && <th>Pemesan</th>}
              <th>Produk</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const status = STATUS_BADGE[order.status] ?? STATUS_BADGE.failed;

              return (
                <tr key={order._id} className="hover align-top">
                  <th>{index + 1}</th>
                  {isOwner && (
                    <td className="whitespace-nowrap font-medium">
                      {order.firstName} {order.lastName}
                    </td>
                  )}
                  <td>
                    <ul className="space-y-3">
                      {order.itemsDetail.map((product, idx) => (
                        <li key={`${product.product}-${idx}`}>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-base-content/70">
                            {product.quantity} x {priceFormatter(product.price)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="whitespace-nowrap font-semibold">
                    {priceFormatter(order.total)}
                  </td>
                  <td>
                    <span className={`badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderView;
