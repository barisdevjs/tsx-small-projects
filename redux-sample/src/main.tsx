import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ecommerce from "./pages/E-Commerce.tsx";
import MultiStepFrom from "./pages/MultiStepFrom.tsx";
import Navbar from "./components/Navbar.tsx";
import SingleProduct from "./components/SingleProduct.tsx";
import Home from "./pages/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/form",
        element: <MultiStepFrom />,
      },
      {
        path: "/ecommerce",
        element: <Ecommerce />,
        loader: () => <div>Loading...</div>,
      },
      {
        path: "/ecommerce/:id",
        element: <SingleProduct />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
