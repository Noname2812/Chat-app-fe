import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import { loginSuccess } from "../../redux/reducers/authReducers";

import ButtonLoginWithGoogle from "../../components/ButtonLoginWithGoogle";
import { authApi } from "../../api/authApi";
import { useEffect } from "react";

const LoginPage = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmitLogin = async (values) => {
    try {
      const res = await authApi.login(values);
      dispatch(
        loginSuccess({
          ...res.data.data.user,
          token: res.data?.data?.token,
          refreshToken: res.data?.data?.refreshToken,
        })
      );
      toast.success("Login successfully !");
      navigate("/");
    } catch (error) {
      toast.error("Username or password is wrong !");
    }
  };
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-32 shadow-xl">
        <h2 className="text-4xl text-center font-bold">Login</h2>
        <Form onFinish={handleSubmitLogin} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-[300px]" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
