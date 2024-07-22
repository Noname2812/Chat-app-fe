import { Col, Row } from "antd";

import ListFriendsComponent from "../../components/ListFriendsComponent";

import MainChatComponent from "../../components/MainChatComponent";
import MenuRoomChats from "../../components/MenuRoomChats";

import useWindowSize from "../../hooks/useWindowSize";
import HomeMobileComponent from "../../components/mobileComponent/HomeMobileComponent";
import FormChat from "../../components/FormChat";
const HomeComponent = () => {
  const size = useWindowSize();

  return (
    <main className=" xs:px-2 sm:px-32 max-w-screen overflow-x-hidden">
      {size.width < 768 ? (
        <HomeMobileComponent />
      ) : (
        <>
          <div>
            <h2 className="xs:text-xl sm:text-2xl text-center font-bold py-4">
              Chào mừng đến chat app
            </h2>
          </div>
          <Row gutter={[16, 0]}>
            <Col span={6}>
              <MenuRoomChats />
            </Col>
            <Col span={12}>
              <MainChatComponent />
              <FormChat />
            </Col>
            <Col span={6}>
              <ListFriendsComponent />
            </Col>
          </Row>
        </>
      )}
    </main>
  );
};

export default HomeComponent;
