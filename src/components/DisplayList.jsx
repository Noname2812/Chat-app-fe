import React, { useEffect, useRef, useState } from "react";
import { Image, List } from "antd";
import { useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import { findRoomById } from "../utils/functionHelper";
import { getRoomsState } from "../redux/reducers/roomReducer";
const DisplayList = ({ roomId }) => {
  const { user } = useAppSelector(getAuthState);
  const { rooms } = useAppSelector(getRoomsState);
  const [data, setData] = useState([]);
  const ref = useRef(null);

  const handleScroll = async () => {
    if (ref.current.scrollTop === 0) {
      // fetch more data
    }
  };
  useEffect(() => {
    setData(findRoomById(rooms, roomId)?.messages || []);
  }, [roomId, rooms]);
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [data]);
  useEffect(() => {
    const scrollableDiv = ref.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
      ref={ref}
    >
      {data.length > 0 && (
        <List
          dataSource={[...data].reverse() || []}
          renderItem={(item) => (
            <div key={item.id}>
              {item.imageUrl && (
                <div
                  className={`flex ${
                    user?.id === item.userId ? "justify-end" : ""
                  } p-2 `}
                >
                  <Image
                    src={item.imageUrl}
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
                    style={{
                      maxWidth: "75%",
                      minWidth: "10%",
                      wordBreak: "break-word",
                    }}
                    className={`p-2 rounded ${
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
      )}
    </div>
  );
};
export default DisplayList;
