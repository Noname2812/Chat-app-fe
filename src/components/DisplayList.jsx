import React, { useEffect, useState } from "react";
import { Divider, Image, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import { findRoomById } from "../utils/functionHelper";
import { getRoomsState } from "../redux/reducers/roomReducer";
const DisplayList = ({ roomId }) => {
  const { user } = useAppSelector(getAuthState);
  const { rooms } = useAppSelector(getRoomsState);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setData(findRoomById(rooms, roomId)?.messages || []);
  }, [roomId, rooms]);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={loadMoreData}
          hasMore={data?.length < 10}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain></Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data || []}
            renderItem={(item) => (
              <div key={item.id}>
                {item.image && (
                  <div
                    className={`flex ${
                      user?.id === item.userId ? "justify-end" : ""
                    } p-2 `}
                  >
                    <Image
                      src={item.image}
                      alt={item.id}
                      width={150}
                      height={150}
                    />
                  </div>
                )}
                {item.content && (
                  <div
                    className={`flex ${
                      user?.id === item.userId ? "justify-end" : ""
                    } p-2 `}
                  >
                    <div
                      style={{ maxWidth: "75%", minWidth: "10%" }}
                      className={`p-2 ${
                        user?.id === item.userId ? "bg-blue-400 " : ""
                      } shadow-xl`}
                    >
                      <p className="text-start">{`${item.content}`}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};
export default DisplayList;
