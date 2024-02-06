import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchProducts } from "../slices/eCommerceSlice";
import ProductsTable from "../components/ProductsTable";

function Ecommerce() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.productsReducer.products
  );

  const status =
    useSelector((state: RootState) => state.productsReducer.status) ===
    "loading"
      ? true
      : false;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return <ProductsTable status={status} products={products} />;
}

export default Ecommerce;
