import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import {
  getFriendsOnline,
  loginSuccess,
} from "../../redux/reducers/authReducers";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { fetchRoomId } from "../../redux/thunkApi";
import ButtonLoginWithGoogle from "../../components/ButtonLoginWithGoogle";
import { authApi } from "../../api/authApi";

const LoginPage = () => {
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
  return (
    <div>
      <Form onFinish={handleSubmitLogin}>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <ButtonLoginWithGoogle handleSubmitLogin={handleSubmitLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
