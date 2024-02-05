import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchProducts } from "../slices/eCommerceSlice";

function Ecommerce() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.productsReducer.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div style={{ width: 640, height: 700, backgroundColor: "yellow" }}>
      Ecommerce
      {JSON.stringify(products, null, 2)}
    </div>
  );
}

export default Ecommerce;
