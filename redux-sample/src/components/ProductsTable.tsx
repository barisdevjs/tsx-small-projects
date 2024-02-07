import { Space, Table, Image, Input, Button, InputRef } from "antd";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { FilterDropdownProps} from "antd/es/table/interface";
import type { Key } from "react";
import { IECommerce } from "../types/generalTypes";

const ProductsTable: React.FC<{ products: IECommerce[]; status: boolean }> = ({
  products,
  status,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<
    keyof IECommerce | string
  >("");
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (dataIndex: keyof IECommerce) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value: boolean | Key | string, record: IECommerce) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: keyof IECommerce
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const generateCategoryFilters = (products: IECommerce[]) => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );

    const filterOptions = uniqueCategories.map((category) => ({
      text: category,
      value: category,
    }));

    return filterOptions;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <Image width={70} src={text} alt="Product Image" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: IECommerce, b: IECommerce) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: generateCategoryFilters(products),
      onFilter: (value: boolean | Key | string, record: IECommerce) =>
        record.category === value,
    },
    {
      title: "Rating",
      children: [
        {
          title: "Points",
          dataIndex: ["rating", "rate"],
          key: "rate",
          width: 50,
          render: (value: number) => <p>{value}</p>,
        },
        {
          title: "Votes",
          dataIndex: ["rating", "count"],
          key: "count",
          width: 50,
          render: (value: number) => <p>{value}</p>,
        },
      ],
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IECommerce) => (
        <Space size="middle">
          <a>Details of {record.id}</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      bordered
      style={{ padding: "auto" }}
      loading={{ spinning: status, size: "large" }}
      size="small"
      pagination={{
        showQuickJumper: true,
        defaultPageSize: 2,
        style: { marginRight: "20px" },
        pageSize: 5,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
};

export default ProductsTable;
