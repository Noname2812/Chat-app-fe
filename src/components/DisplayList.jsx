import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, List } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import { getRoomsState } from "../redux/reducers/roomReducer";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
import { findRoomById } from "../utils/functionHelper";
const DisplayList = () => {
  const { user } = useAppSelector(getAuthState);
  const { roomSelected, rooms } = useAppSelector(getRoomsState);
  const [data, setData] = useState([]);
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const handleScroll = useCallback(() => {
    if (ref.current.scrollTop === 0) {
      dispatch(
        fetchRoomId({
          roomId: roomSelected?.id,
          offset: data.length,
          limit: 10,
        })
      );
    }
  }, [dispatch, ref, roomSelected, data.length]);
  useEffect(() => {
    setData(findRoomById(rooms, roomSelected?.id)?.messages || []);
  }, [roomSelected?.id, rooms]);
  useEffect(() => {
    if (ref?.current && data.length < 11) {
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
  }, [handleScroll]);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
      className="w-full"
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
