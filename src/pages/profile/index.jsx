import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState } from "../../redux/reducers/authReducers";
import { useForm } from "antd/es/form/Form";
import { MUploadImage } from "../../components/MUploadImage";
import { updateProfile } from "../../redux/asyncThunk/userThunk";
const Profile = () => {
  const { user } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const handleSubmit = async (value) => {
    try {
      dispatch(updateProfile(value));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col gap-8 w-2/3 shadow-xl px-16 py-8">
        <h2 className="text-xl font-bold text-center">Thông tin tài khoản</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Row>
            <Col span={8}>
              <MUploadImage
                image={user?.avatar || ""}
                forName="avatar"
                disableTitle
                notRequired
              />
            </Col>
            <Col span={16}>
              <Row>
                <Col span={24} className="hidden">
                  <Form.Item
                    name="id"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    // labelCol={{ span: 8 }}
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      { required: true, message: "Please input your phone" },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Vui lý nhap ten !" }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label="Adress"
                    rules={[
                      { required: true, message: "Please input your phone" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
// "id": 0,
// "name": "string",
// "email": "string",
// "phone": "string",
// "adress": "string",
// "avatar": "string",
