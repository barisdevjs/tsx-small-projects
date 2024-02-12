import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductsById } from "../slices/eCommerceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Card, Image, Modal, Segmented, Space, Typography } from "antd";
import type { DescriptionsProps } from "antd";
import { IECommerce } from "../types/generalTypes";
import { capitalizeFirstLetter } from "../utils/helpers";
import { FastBackwardOutlined, EllipsisOutlined } from "@ant-design/icons";
import styles from "../styles.module.css";
import { SegmentedLabeledOption } from "antd/es/segmented";
const { Meta } = Card;
const { Text } = Typography;

type TFilter = "id" | "category" | "price";
type SegmentedItemOption = SegmentedLabeledOption<TFilter>;

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<TFilter>("id");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

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
          <Image width={100} src={product[key]} />
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

  const segmentedItems = Object.keys(product).filter(
    (e) =>
      e !== "description" && e !== "image" && e !== "rating" && e !== "title"
  );
  const renderSegmentedText = (selectedItem: TFilter) => {
    return product[selectedItem];
  };

  const segmentedItemsOptions: SegmentedItemOption[] = segmentedItems.map(
    (item) => ({
      value: item as TFilter,
      label: item,
    })
  );
  useEffect(() => {
    dispatch(fetchProductsById(id as string));
  }, [dispatch, id]);
  return (
    <div className={styles.singleProduct}>
      <Card
        style={{ width: "25rem", padding:"1rem" }}
        cover={<img alt="example" src={image} />}
        loading={status}
        bordered
        size="default"
        actions={[
          <FastBackwardOutlined key="edit" onClick={() => navigate(-1)} />,
          <EllipsisOutlined key="ellipsis" onClick={showModal} />,
        ]}
      >
        <Meta title={title} description={description} />
        <Modal
          title="Product Details"
          open={isModalOpen}
          onOk={handleOk}
          cancelButtonProps={{ disabled: true }}
          okText="Close"
        >
          <Space direction="vertical">
            <Segmented
              size="large"
              options={segmentedItemsOptions}
              onChange={(selectedItem: TFilter) =>
                setSelectedSegment(selectedItem)
              }
            />
            <Text>{renderSegmentedText(selectedSegment)}</Text>
          </Space>
        </Modal>
      </Card>
    </div>
  );
}
