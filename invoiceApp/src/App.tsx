import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NewInvoice from './NewInvoice';
import Home from './Home';
import type { MenuProps } from 'antd';
import styles from './styles.module.css'

const { Header, Content, Footer } = Layout;

const items = [{
  key: '/',
  label: 'Home',
},
{
  key:"newInvoice",
  label: 'New Invoice',
}
]

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          className='w-full'
          defaultOpenKeys={['/']}
          items={items}
          onClick={onClick}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content w-auto h-auto m-4 flex flex-col gap-y-4" style={{ background: colorBgContainer }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/newInvoice" element={<NewInvoice />} />
        </Routes>
        </div>
      </Content>
      <Footer className={styles.footer} style={{ textAlign: 'center' }}>©2023 Created by @barisdevjs</Footer>
    </Layout>
  );
};

export default App;
