import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import ProductView from "./pages/ProductView";
import AboutView from "./pages/AboutView";
import OrderView from "./pages/OrderView";
import CartView from "./pages/CartView";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import DetailProduct from "./pages/DetailProduct";
import CreateProductView from "./pages/CreateProductView";
import EditProductView from "./pages/EditProductView";

// Loader
import { loader as homeLoader } from "./pages/HomeView";
import { loader as productLoader } from "./pages/ProductView";
import { loader as checkoutLoader } from "./pages/CheckoutView";
import { loader as orderLoader } from "./pages/OrderView";
import { loader as createLoader } from "./pages/CreateProductView";
import { loader as editLoader } from "./pages/EditProductView";

// action
import { action as LoginAction } from "./pages/auth/LoginView";
import { action as RegisterAction } from "./pages/auth/RegisterView";

// storage
import { store } from "./store";
import CheckoutView from "./pages/CheckoutView";
import ErrorVew from "./pages/ErrorVew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorVew />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: homeLoader,
        HydrateFallback: () => (
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ),
      },
      {
        path: "products",
        element: <ProductView />,
        loader: productLoader,
        HydrateFallback: () => (
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ),
      },
      {
        path: "products/create",
        element: <CreateProductView />,
        loader: createLoader(store),
      },
      {
        path: "products/:id/edit",
        element: <EditProductView />,
        loader: editLoader(store),
      },
      {
        path: "products/:id",
        element: <DetailProduct />,
      },
      {
        path: "checkout",
        element: <CheckoutView />,
        loader: checkoutLoader(store),
      },
      {
        path: "orders",
        element: <OrderView />,
        loader: orderLoader(store),
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction(store),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
