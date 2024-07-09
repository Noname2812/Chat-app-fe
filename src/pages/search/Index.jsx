import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchApi } from "../../api/searchApi";
import { Avatar, Button, Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAuthState } from "../../redux/reducers/authReducers";
import { userApi } from "../../api/userApi";
import { acceptAddFriendRequest } from "../../redux/asyncThunk/userThunk";
import { getFriendState } from "../../redux/reducers/friendReducer";

const SearchPageComponent = () => {
  const { user } = useAppSelector(getAuthState);
  const { updating } = useAppSelector(getFriendState);
  const { search } = useParams();

  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const handleAddFriend = async (id) => {
    try {
      const res = await userApi.sendAddFriendRequest({
        userId: user.id,
        friendId: id,
      });
      setData((data) =>
        data.map((item) => {
          if (item.id === id) {
            return { ...item, friendShip: res.data?.data?.friendShip };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (updating !== "Pending") {
      searchApi
        .search({ searchValue: search, offset: 0, limit: 10 })
        .then((res) => {
          console.log(res.data?.data);
          setData(res.data?.data);
        })
        .catch((err) => console.log(err));
    }
  }, [search, updating]);
  return (
    <div className="py-16 px-32">
      {data && data.length > 0 && (
        <div className="py-4">
          <p className="text-xl font-semibold">{`Đã tìm thấy ${data.length} kết quả với từ khóa ${search}`}</p>
        </div>
      )}
      <div>
        {data?.map((item) => (
          <Row key={item.id} className="flex gap-4 w-full py-4 px-4 shadow-2xl">
            <Col span={6}>
              <a href={`/profile/${item.id}`}>
                <Row gutter={[16, 0]}>
                  <Col>
                    <Avatar src={item.avatar} />
                  </Col>
                  <Col>
                    <p className="text-lg">{item.name}</p>
                  </Col>
                </Row>
              </a>
            </Col>

            <Col>
              {item.friendship?.status === "Accepted" && (
                <Button className="bg-green-500 text-white ">Bạn bè</Button>
              )}
              {item.friendship?.status === "Pending" &&
                item.friendship?.friendId === user?.id && (
                  <Row gutter={[8, 0]}>
                    <Col>
                      <Button
                        onClick={() =>
                          dispatch(
                            acceptAddFriendRequest({
                              userId: user.id,
                              friendId: item.id,
                            })
                          )
                        }
                      >
                        Chấp nhận kết bạn
                      </Button>
                    </Col>
                    <Col>
                      <Button>Xóa</Button>
                    </Col>
                  </Row>
                )}
              {item.friendship?.status === "Pending" &&
                item.friendship?.userId === user?.id && (
                  <Button className="bg-green-500 text-white">
                    Đang chờ xác nhận
                  </Button>
                )}
              {!item.friendship && (
                <Button
                  className="bg-blue-500 text-white"
                  onClick={() => handleAddFriend(item.id)}
                >
                  Thêm bạn bè
                </Button>
              )}
            </Col>
          </Row>
        ))}
      </div>
      {!data ||
        (data.length === 0 && (
          <div>
            <p>
              Không tìm thấy kết quả cho từ khóa
              <span className="font-bold text-xl pl-2">{search}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default SearchPageComponent;
