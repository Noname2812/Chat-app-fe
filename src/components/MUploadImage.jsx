import React, { useEffect, useState } from "react";
import { Form, Image, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const MUploadImage = ({ image, forName, disableTitle, notRequired }) => {
  const [imageLocal, setImageLocal] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setImageLocal(info.file?.response?.url);
    }
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList?.[e?.fileList?.length - 1 || 0]?.response?.url;
  };

  useEffect(() => {
    setImageLocal(image || "");
  }, [image]);

  return (
    <Form.Item
      label={disableTitle ? "" : "Image"}
      name={forName || "imageUpload"}
      getValueFromEvent={getFile}
      rules={[
        {
          required: !notRequired,
          message: "Image is required",
        },
      ]}
    >
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:5264/api/photo/up-load-photo"
        onChange={handleChange}
        accept="image/*"
      >
        {!loading && imageLocal ? (
          <Image
            src={imageLocal}
            alt="avatar"
            style={{ width: "100%" }}
            preview={false}
          />
        ) : (
          <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
    </Form.Item>
  );
};
