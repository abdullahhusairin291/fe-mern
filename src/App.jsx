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

// Loader
import { loader as homeLoader } from "./pages/HomeView";
import { loader as productLoader } from "./pages/ProductView";

// action
import { action as LoginAction } from "./pages/auth/LoginView";
import { action as RegisterAction } from "./pages/auth/RegisterView";

// storage
import { store } from "./store";
import CheckoutView from "./pages/CheckoutView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
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
        path: "products/:id",
        element: <DetailProduct />,
      },
      {
        path: "checkout",
        element: <CheckoutView />,
      },
      {
        path: "orders",
        element: <OrderView />,
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
