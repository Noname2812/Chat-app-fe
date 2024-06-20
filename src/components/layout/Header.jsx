import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState, logout } from "../../redux/reducers/authReducers";
import { Avatar, Button, Dropdown, Image } from "antd";
import { authApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAppSelector(getAuthState);
  const location = useLocation();
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
    <header>
      {user && (
        <div className="flex justify-between px-4 py-2 bg-black  items-center ">
          <div className="cursor-pointer" onClick={() => handleClickGoHome()}>
            <FontAwesomeIcon icon={faHome} color="white" size="2x" />
          </div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <div
              className="flex gap-4 items-center cursor-pointer"
              key={"qeqqqq"}
            >
              <Avatar
                size={64}
                className="bg-green-500"
                icon={
                  user?.image ? (
                    <Image src={user?.image} preview={false} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )
                }
              />
              <p className="text-xl text-white">{`${user?.name}`}</p>
            </div>
          </Dropdown>
        </div>
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
