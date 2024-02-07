import {  Space } from "antd";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return(
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Navbar />;
    </Space>
  ) 
}

export default App;
