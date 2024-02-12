import { Watermark } from "antd";

function Home() {
    return (
      <Watermark content="Barış SAVAŞ" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 13 }}>
        {/* <div style={{ height: "87.8dvh" }} /> */}
      </Watermark>
    );
  }

export default Home;
