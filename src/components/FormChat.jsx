import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { sendMessages } from "../redux/asyncThunk/chatThunk";
import { getRoomsState } from "../redux/reducers/roomReducer";
import MUploadImageMultiple from "./MUploadImageMultiple";

const FormChat = () => {
  const dispatch = useAppDispatch();
  const { roomSelected } = useAppSelector(getRoomsState);
  const [form] = Form.useForm();
  const sendMessage = (value) => {
    dispatch(
      sendMessages({
        ...value,
        roomId: roomSelected?.id,
        isPrivate: roomSelected?.isPrivate,
        to: roomSelected?.to,
        name: roomSelected?.name,
      })
    );
    form.setFieldsValue({ message: "", images: [] });
  };
  return (
    <div className={`xs:py-1 sm:py-4 ${roomSelected ? "" : "hidden"} w-full`}>
      <Form
        onFinish={sendMessage}
        form={form}
        initialValues={{ message: "", images: [] }}
      >
        <Row justify={"end"} gutter={[16, 0]} className="w-full">
          <Col xl={16} xs={24}>
            <Form.Item name="message">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xl={4} xs={12}>
            <MUploadImageMultiple initFileList={form.getFieldValue("images")} />
          </Col>
          <Col xl={4} xs={12}>
            <div className="flex justify-end">
              <Button
                htmlType="submit"
                type="primary"
                className="w-[100px]  xl:w-full "
              >
                Chat
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormChat;
