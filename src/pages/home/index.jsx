import MenuRoomChats from "../../components/MenuRoomChats";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState } from "../../redux/reducers/authReducers";
import { Button, Form, Input } from "antd";
import ListUserOnline from "../../components/ListUserOnline";
import DisplayList from "../../components/DisplayList";
import MUploadImageMultiple from "../../components/MUploadImageMultiple";
import { chatApi } from "../../api/chatApi";
import { fetchRoomId } from "../../redux/asyncThunk/roomThunk";
import { toast } from "react-toastify";
import { HubConnection } from "../../lib/HubConnection";
import { useState } from "react";

const HomeComponent = () => {
  const authState = useAppSelector(getAuthState);
  const [roomIdSelectd, setRoomIdSelected] = useState();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const sendMessage = async (value) => {
    try {
      const res = await chatApi.chat({ ...value, roomId: roomIdSelectd });
      dispatch(fetchRoomId({ roomId: res.data.data.roomId }));
      HubConnection.chat({
        roomId: roomIdSelectd,
        message: value.message,
        from: authState?.user?.id,
        isPrivate: true,
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau !");
    }
  };
  return (
    <main className="pt-2 px-32 w-screen">
      <div>
        <h2 className="text-2xl text-center font-bold py-4">
          Chào mừng đến chat app
        </h2>
      </div>
      <div className="flex gap-2 w-full h-15/16">
        <MenuRoomChats
          onClick={(value) => setRoomIdSelected(value)}
          roomIdSelectd={roomIdSelectd}
        />
        <div className="w-1/2 ">
          <DisplayList roomId={roomIdSelectd} />
          <div className={`py-4 ${roomIdSelectd ? "" : "hidden"}`}>
            <Form
              onFinish={sendMessage}
              form={form}
              initialValues={{ message: "", images: [] }}
            >
              <Form.Item name="message">
                <Input.TextArea rows={2} />
              </Form.Item>
              <MUploadImageMultiple
                initFileList={form.getFieldValue("images")}
              />
              <Button htmlType="submit" type="primary">
                Chat
              </Button>
            </Form>
          </div>
        </div>
        <ListUserOnline data={authState.friendsOnline} />
      </div>
    </main>
  );
};

export default HomeComponent;
