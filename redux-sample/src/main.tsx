import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ecommerce from "./pages/E-Commerce.tsx";
import MultiStepFrom from "./pages/MultiStepFrom.tsx";
import Navbar from "./components/Navbar.tsx";
import SingleProduct from "./components/SingleProduct.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "1",
    element: <Navbar />,
    children: [
      {
        path: "/ecommerce",
        id: "2",
        element: <Ecommerce />,
        loader: () => <div>Loading...</div>,
        children:[
          {
            path: ":id", 
            id: "4",
            element: <SingleProduct />,
          },
        ]
      },
      {
        path: "/form",
        id: "3",
        element: <MultiStepFrom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
