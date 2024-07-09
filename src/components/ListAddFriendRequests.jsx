import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import {
  acceptAddFriendRequest,
  getListAddFriendRequests,
} from "../redux/asyncThunk/userThunk";
import { getFriendState } from "../redux/reducers/friendReducer";
import { Avatar, Button, Col, Dropdown, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const ListAddFriendRequests = () => {
  const { user } = useAppSelector(getAuthState);
  const { listAddFriendRequests, updating } = useAppSelector(getFriendState);
  const [items, setItems] = useState([]);
  const dispatch = useAppDispatch();
  const handleAccept = (id) => {
    dispatch(acceptAddFriendRequest({ userId: id, friendId: user.id }));
  };
  const handleReject = (id) => {
    console.log(user.id, id);
  };
  useEffect(() => {
    if (updating !== "Pending") {
      dispatch(getListAddFriendRequests({ offset: 0, limit: 10 }));
    }
  }, [dispatch, updating]);
  useEffect(() => {
    setItems(
      listAddFriendRequests?.map((request) => ({
        label: (
          <div className="flex flex-col gap-4">
            <Row gutter={[16, 0]} align={"middle"}>
              <Col>
                <Avatar src={request?.avatar} />
              </Col>
              <Col>
                <p>{request?.name}</p>
              </Col>
            </Row>
            <Row gutter={[8, 0]}>
              <Col>
                <Button onClick={() => handleAccept(request.id)}>
                  Chấp nhận kết bạn
                </Button>
              </Col>
              <Col>
                <Button onClick={() => handleReject(request.id)}>Xóa</Button>
              </Col>
            </Row>
          </div>
        ),
        key: request.id,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAddFriendRequests]);
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <div className="flex gap-4 items-center cursor-pointer">
        <FontAwesomeIcon icon={faBell} color="white" size="2xl" />
      </div>
    </Dropdown>
  );
};

export default ListAddFriendRequests;
