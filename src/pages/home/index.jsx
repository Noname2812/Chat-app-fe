import MenuRoomChats from "../../components/MenuRoomChats";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState } from "../../redux/reducers/authReducers";
import { Button, Col, Form, Input, Row } from "antd";
import ListUserOnline from "../../components/ListUserOnline";
import DisplayList from "../../components/DisplayList";
import MUploadImageMultiple from "../../components/MUploadImageMultiple";
import { chatApi } from "../../api/chatApi";
import { fetchRoomId } from "../../redux/asyncThunk/roomThunk";
import { toast } from "react-toastify";
import { HubConnection } from "../../lib/HubConnection";
import { getRoomsState } from "../../redux/reducers/roomReducer";

const HomeComponent = () => {
  const authState = useAppSelector(getAuthState);
  const { roomSelected } = useAppSelector(getRoomsState);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const sendMessage = async (value) => {
    try {
      const res = await chatApi.chat({
        ...value,
        roomId: roomSelected?.id,
        isPrivate: roomSelected?.isPrivate,
        to: roomSelected?.to,
        name: roomSelected?.name,
      });
      dispatch(fetchRoomId({ roomId: res.data?.data?.roomId }));
      HubConnection.chat({
        roomId: res.data?.data?.roomId,
        message: value.message,
        from: authState?.user?.id,
        isPrivate: roomSelected?.isPrivate,
      });
      form.setFieldsValue({ message: "", images: [] });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau !");
    }
  };
  return (
    <main className="pt-2  px-32 max-w-screen overflow-x-hidden">
      <div>
        <h2 className="text-2xl text-center font-bold py-4">
          Chào mừng đến chat app
        </h2>
      </div>
      <Row gutter={[16, 0]}>
        <Col span={6}>
          <MenuRoomChats />
        </Col>
        <Col span={12}>
          <DisplayList />
          <div className={`py-4 ${roomSelected ? "" : "hidden"}`}>
            <Form
              onFinish={sendMessage}
              form={form}
              initialValues={{ message: "", images: [] }}
            >
              <Row justify={"end"} gutter={[16, 0]} className="w-full">
                <Col xl={16} sm={24}>
                  <Form.Item name="message">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col xl={4} sm={12}>
                  <MUploadImageMultiple
                    initFileList={form.getFieldValue("images")}
                  />
                </Col>
                <Col xl={4} sm={12}>
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
        </Col>
        <Col span={6}>
          <ListUserOnline />
        </Col>
      </Row>
    </main>
  );
};

export default HomeComponent;
