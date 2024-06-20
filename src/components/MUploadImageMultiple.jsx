import React, { useEffect, useState } from "react";
import { Form, Image, Modal, Upload } from "antd";

const MUploadImageMultiple = (props) => {
  const { children, initFileList, ...rest } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(initFileList || []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file?.response?.image || file?.thumbUrl || "");
    setPreviewOpen(true);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const getFile = (e) => {
    const result = e?.fileList?.map((item) => item?.response?.url || "");
    return result;
  };

  useEffect(() => {
    if (initFileList) {
      const newFileList = initFileList.map((item, i) => ({
        thumbUrl: item,
        uid: i + "",
        name: item,
      }));
      setFileList(newFileList);
    }
  }, [initFileList]);

  return (
    <>
      <Form.Item
        name={"images"}
        getValueFromEvent={getFile}
        rules={[
          {
            validator(_, fileList) {
              return new Promise((resolve, reject) => {
                if (fileList && fileList.length > 5) {
                  reject("Images is limit 5");
                } else {
                  resolve("Success");
                }
              });
            },
          },
        ]}
      >
        <Upload
          action="http://localhost:5264/api/photo/up-load-photo"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
          multiple
          accept="image/*"
          {...rest}
        >
          {!props.disabled && fileList.length < 5 && "+ Upload"}
        </Upload>
      </Form.Item>
      <Modal
        open={previewOpen}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        className="flex justify-center"
      >
        <Image
          alt="example"
          style={{ width: "100%" }}
          src={previewImage}
          preview={false}
        />
      </Modal>
    </>
  );
};

export default MUploadImageMultiple;
