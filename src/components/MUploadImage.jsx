import React, { useState } from "react";
import { Form, Upload } from "antd";
export const MUploadImage = () => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return (
      e?.fileList?.[e?.fileList?.length - 1 || 0]?.response?.url ?? undefined
    );
  };

  return (
    <Form.Item name="image" getValueFromEvent={getFile}>
      <Upload
        action="http://localhost:5264/api/photo/up-load-photo"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>
    </Form.Item>
  );
};
