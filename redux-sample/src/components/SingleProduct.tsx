import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductsById } from "../slices/eCommerceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Button, Card, Descriptions, Image } from "antd";
import type { DescriptionsProps } from "antd";
import { IECommerce } from "../types/generalTypes";
import { capitalizeFirstLetter } from "../utils/helpers";

const { Meta } = Card;

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(
    (state: RootState) => state.productsReducer.singleProduct
  );
  const keyValuesArray: DescriptionsProps["items"] = Object.keys(product)
    .filter((key) => key !== "rating")
    .map((key, i) => ({
      key: i,
      label: capitalizeFirstLetter(key),
      children:
        key === "image" ? (
          <Image width={200} src={product[key]} />
        ) : (
          product[key as keyof Omit<IECommerce, "rating">]
        ),
    }));

  const status =
    useSelector((state: RootState) => state.productsReducer.status) ===
    "loading"
      ? true
      : false;

  const descriptionItem = keyValuesArray.find(
    (item) => item.label === "Description"
  );
  const description = descriptionItem ? descriptionItem.children : "";

  const titleItem = keyValuesArray.find((item) => item.label === "Title");
  const title = titleItem ? titleItem.children : "";

  const imageItem = keyValuesArray.find((item) => item.label === "Image");
  const image = imageItem
    ? (imageItem.children as React.ReactElement)?.props.src
    : "";

  useEffect(() => {
    dispatch(fetchProductsById(id as string));
  }, [dispatch, id]);
  return (
    <div>
      {status && <div>Loading...</div>}
      {!status && (
        <Card
          style={{ width: "20rem" }}
          cover={<img alt="example" src={image} />}
        >
          <Meta title={title} description={description} />
        </Card>
      )}
    </div>
  );
}
