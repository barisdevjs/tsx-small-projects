import { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "/",
    icon: <MailOutlined />,
  },
  {
    label: "E-Commerce",
    key: "/ecommerce",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Form",
    key: "/form",
    icon: <SettingOutlined />,
  },
];

function Navbar() {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key.slice(1));
  };

  return (
    <Layout>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Content style={{ padding: "2rem" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default Navbar;
