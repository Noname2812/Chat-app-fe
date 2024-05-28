import { Button, Form, Input } from "antd";
import MenuRoomChats from "../../components/MenuRoomChats";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState } from "../../redux/reducers/authReducers";
import { getChatState } from "../../redux/reducers/chatReducers";
import ListUserOnline from "../../components/ListUserOnline";
import { useEffect, useState } from "react";
import MainChat from "../../components/MainChat";
import { validateMessage } from "../../utils/validations";
import { findRoomById } from "../../utils/functionHelper";
import { fetchRoomId } from "../../redux/thunkApi";

const HomeComponent = () => {
  const chatState = useAppSelector(getChatState);
  const authState = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const [roomId, setRoomId] = useState(undefined);
  const [form] = Form.useForm();
  const sendMessage = async (value) => {
    fetch("http://localhost:5264/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.user.token}`,
      },
      body: JSON.stringify({
        roomId: roomId,
        message: value.message.trim(),
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (chatState.hubConnection) {
            await chatState.hubConnection.invoke("SendMessage", {
              roomId: data.data.roomChatId,
              message: data.data.content,
              from: data.data.userId,
            });
            form.setFieldsValue({
              message: "",
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    chatState.hubConnection.on("GetPrivateRoomChat", (roomId) => {
      const room = findRoomById(chatState.rooms, roomId);
      if (room) {
        setRoomId(roomId);
      } else {
        setRoomId(roomId);
        dispatch(fetchRoomId({ roomId }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatState.hubConnection, dispatch]);
  return (
    <main className="pt-2 px-32 w-screen">
      <div>
        <h2 className="text-2xl text-center font-bold py-4">
          Chào mừng đến chat app
        </h2>
      </div>
      <div className="flex gap-2 w-full h-15/16">
        <MenuRoomChats
          roomSelected={roomId}
          setRoomSelected={(id) => setRoomId(id)}
          userId={authState.user.id}
        />
        <div className="w-1/2 ">
          <MainChat userId={authState.user.id} roomId={roomId} />
          <div className="py-4">
            <Form onFinish={sendMessage} form={form}>
              <Form.Item
                name="message"
                rules={[{ validator: validateMessage }]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
              <Button htmlType="submit" type="primary" disabled={!roomId}>
                Chat
              </Button>
            </Form>
          </div>
        </div>
        <ListUserOnline
          data={authState.friendsOnline}
          setRoomSelected={(id) => setRoomId(id)}
        />
      </div>
    </main>
  );
};

export default HomeComponent;
