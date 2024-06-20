import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import ButtonLoginWithGoogle from "../../components/ButtonLoginWithGoogle";

const Register = ({ user }) => {
  const navigate = useNavigate();
  const handleSubmitLogin = async (values) => {
    const { confirmPassword, ...rest } = values;
    try {
      await authApi.register(rest);
      toast.success("Register successfully !");
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.errors?.message) {
        toast.error(error?.response?.data?.errors?.message);
      }
    }
  };
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);
  return (
    <div className="w-full h-[90vh] flex items-center justify-center rounded">
      <div className="flex flex-col gap-4 px-16 py-8 shadow-xl">
        <h2 className="text-4xl text-center font-bold">Register</h2>
        <Form
          onFinish={handleSubmitLogin}
          layout="vertical"
          className="w-[400px]"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="name"
            label="Your name"
            rules={[{ required: true, message: "Please input your mail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Your Email"
            rules={[{ required: true, message: "Please input your mail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Your phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Your Address">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
        <div className="flex justify-center">
          <ButtonLoginWithGoogle handleSubmitLogin={handleSubmitLogin} />
        </div>
        <div className="flex justify-center">
          <Button
            type="default"
            htmlType="button"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
// "name": "string",
//   "email": "user@example.com",
//   "phone": "stringstri",
//   "address": "string",
//   "password": "string",
//   "userName": "string"
