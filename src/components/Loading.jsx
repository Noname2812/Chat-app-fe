import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div
      className="w-full h-full flex justify-center items-center"
      style={{ zIndex: 999 }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
