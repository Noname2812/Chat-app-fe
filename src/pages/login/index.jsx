import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import {
  getFriendsOnline,
  loginSuccess,
} from "../../redux/reducers/authReducers";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { setConnectionSignalr } from "../../redux/reducers/chatReducers";
import { fetchRoomId } from "../../redux/thunkApi";
import ButtonLoginWithGoogle from "../../components/ButtonLoginWithGoogle";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmitLogin = async (values, enpoint = "login") => {
    const res = await fetch(`http://localhost:5264/api/auth/${enpoint}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5264/hub")
        .configureLogging(LogLevel.Information)
        .build();
      await conn.start();
      conn.invoke("AddUserConnection", {
        userId: data.data.user?.id,
        name: data.data.user?.name,
      });
      conn.on("NotifyUserOnline", (name) => toast(`${name} was online !`));
      conn.on("GetListUserOnline", (users) =>
        dispatch(getFriendsOnline(users))
      );
      conn.on("ReceiveMessagePrivate", (id) => {
        dispatch(fetchRoomId({ roomId: id }));
      });
      dispatch(setConnectionSignalr(conn));
      dispatch(
        loginSuccess({
          ...data.data.user,
          token: data.data.token,
        })
      );
      toast.success("Login successfully !");
      navigate("/");
    } else {
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
