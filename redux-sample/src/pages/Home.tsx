import {
  Watermark,
  List,
  Typography,
  Space,
  Modal,
  Input,
  Button,
  notification,
} from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import React, { useMemo, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

type TDescriptionItem = Record<string, string>;

const data: TDescriptionItem[] = [
  {
    name: "Task Links",
    value:
      "https://www.konzek.com/career-mid-level-frontend-developer-assignment",
    type: "link",
  },
  {
    name: "Task 1",
    value: "E-commerce Store with Advanced Filtering",
    type: "text",
  },
  {
    name: "Task 4",
    value: "Complex Form Handling and Validation",
    type: "text",
  },
  {
    name: "Repo",
    value:
      "https://github.com/barisdevjs/tsx-small-projects/tree/main/redux-sample",
    type: "link",
  },
  {
    name: "Owner",
    value: "https://github.com/barisdevjs",
    type: "link",
  },
  {
    name: "Demo",
    value:
      "https://github.com/barisdevjs/tsx-small-projects/tree/main/redux-sample",
    type: "link",
  },
];

const { Title, Link } = Typography;

const footer = () => {
  return (
    <Space>
      <Link href="mailto:barissavas17@gmail.com" target="_blank">
        Email
      </Link>
      <Link href="tel:+905427318177" target="_blank">
        Call Me
      </Link>
    </Space>
  );
};

const header = () => {
  return <Title level={4}>Project Details</Title>;
};

const renderItem = (item: TDescriptionItem) => {
  return (
    <List.Item>
      <Space
        size={"large"}
        style={{ display: "flex", justifyContent: "center", gap: "4rem" }}
      >
        <Title style={{ flexBasis: "40%", minWidth: "5rem" }} level={5}>
          {item.name}:
        </Title>
        <Title level={5}>
          {item.type === "link" ? (
            <Link href={item.value} target="_blank">
              {item.value}
            </Link>
          ) : (
            item.value
          )}
        </Title>
      </Space>
    </List.Item>
  );
};

const Context = React.createContext({ name: "Default" });

function Home() {
  const correctKey = import.meta.env.VITE_KEY;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [inputKey, setInputKey] = useSessionStorage("inputKey", "");
  const [authorized, setAuthorized] = useState(inputKey === correctKey);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Incorrect key. Please try again.`,
      placement,
    });
    setInputKey("");
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const handleOk = () => {
    if (inputKey === correctKey) {
      setAuthorized(true);
      setIsModalVisible(false);
    } else {
      openNotification("topRight");
      setInputKey("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {authorized ? (
        <Watermark content="Barış SAVAŞ">
          <List
            header={header()}
            footer={footer()}
            bordered
            dataSource={data}
            renderItem={(item) => renderItem(item)}
          />
        </Watermark>
      ) : (
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Watermark
            content="You are not Authorized"
            style={{ height: 500, display: "flex" }}
          >
            <Modal
              title="Enter Key"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input.Password
                placeholder="Enter key"
                onChange={(e) => setInputKey(e.target.value)}
                value={inputKey}
              />
            </Modal>
            {!isModalVisible && (
              <Button
                style={{ margin: "auto" }}
                size="large"
                type="primary"
                onClick={() => setIsModalVisible(!isModalVisible)}
              >
                Re-try your chance
              </Button>
            )}
          </Watermark>
        </Context.Provider>
      )}
    </>
  );
}

export default Home;
