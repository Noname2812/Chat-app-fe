import { Button, Col, Form, Input, Row } from "antd";
import { getRoomsState } from "../../redux/reducers/roomReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ListFriendsComponent from "../../components/ListFriendsComponent";
import MUploadImageMultiple from "../../components/MUploadImageMultiple";
import MainChatComponent from "../../components/MainChatComponent";
import MenuRoomChats from "../../components/MenuRoomChats";
import { sendMessages } from "../../redux/asyncThunk/chatThunk";

const HomeComponent = () => {
  const { roomSelected } = useAppSelector(getRoomsState);

  const dispatch = useAppDispatch();
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
          <MainChatComponent />
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
          <ListFriendsComponent />
        </Col>
      </Row>
    </main>
  );
};

export default HomeComponent;
