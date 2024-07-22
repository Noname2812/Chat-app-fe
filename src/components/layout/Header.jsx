import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState, logout } from "../../redux/reducers/authReducers";
import { Avatar, Button, Col, Dropdown, Image, Row } from "antd";
import { authApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput";
import ListAddFriendRequests from "../ListAddFriendRequests";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const { user } = useAppSelector(getAuthState);
  const location = useLocation();
  const sizeDevice = useWindowSize();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogut = async () => {
    try {
      await authApi.logout();
      dispatch(logout());
    } catch (error) {
      toast.error("Logout failed !");
    }
  };
  const handleClickGoHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  const handleClickGoProfile = () => {
    if (location.pathname !== "/profile") {
      navigate("/profile");
    }
  };
  const items = [
    {
      label: (
        <Button className="w-full" onClick={() => handleClickGoProfile()}>
          Profile
        </Button>
      ),
      key: "123213ss",
    },
    {
      label: (
        <Button className="w-full" onClick={() => handleLogut()}>
          Logout
        </Button>
      ),
      key: "123213sseeww3",
    },
  ];
  return (
    <header className="bg-black flex justify-center">
      {user && (
        <Row
          className="py-2 px-4 w-full max-w-[1200px]"
          align={"middle"}
          gutter={[16, 0]}
        >
          <Col
            xs={2}
            md={8}
            className="cursor-pointer"
            onClick={() => handleClickGoHome()}
          >
            <FontAwesomeIcon
              icon={faHome}
              color="white"
              className="xs:text-xl md:text-3xl"
            />
          </Col>
          <Col xs={14} md={8}>
            <SearchInput />
          </Col>
          <Col xs={8} md={8}>
            <Row align={"middle"} justify={"end"}>
              <Col xs={6} md={4}>
                <ListAddFriendRequests />
              </Col>
              <Col xs={18} md={8}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <div
                    className="flex xs:gap-1 sm:gap-4 items-center cursor-pointer"
                    key={"qeqqqq"}
                  >
                    <Avatar
                      size={sizeDevice.width < 768 ? 36 : 64}
                      className="bg-green-500"
                      icon={
                        user?.avatar ? (
                          <Image
                            src={user?.avatar}
                            preview={false}
                            className="rounded-full"
                            width={sizeDevice.width < 768 ? 36 : 64}
                            height={sizeDevice.width < 768 ? 36 : 64}
                          />
                        ) : (
                          <FontAwesomeIcon icon={faUser} />
                        )
                      }
                    />
                    <p className="xs:text-sm md:text-xl text-white">{`${user?.name}`}</p>
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {!user && (
        <div className="flex justify-center py-4 bg-black overflow-x-hidden">
          <div className="">
            <p className="text-3xl text-white">OKVIP Chat app</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
