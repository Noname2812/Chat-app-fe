import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Image, List } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import { getRoomsState } from "../redux/reducers/roomReducer";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
import { getChatState } from "../redux/reducers/chatReducers";
const MainChatComponent = () => {
  const { user } = useAppSelector(getAuthState);
  const { roomSelected } = useAppSelector(getRoomsState);
  const { chatting } = useAppSelector(getChatState);
  const [showButton, setShowButton] = useState(false);
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const handleScroll = useCallback(() => {
    if (ref.current.scrollTop === 0) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);
  useEffect(() => {
    if (chatting === "Completed" && roomSelected && roomSelected?.id > 0) {
      if (ref?.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
      dispatch(fetchRoomId({ roomId: roomSelected?.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chatting]);
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
        height: 500,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
      className="w-full"
      ref={ref}
    >
      {showButton && (
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button
            onClick={() =>
              dispatch(
                fetchRoomId({
                  roomId: roomSelected?.id,
                  offset: roomSelected?.messages?.length,
                  limit: 10,
                })
              )
            }
          >
            Xem thêm tin nhắn cũ
          </Button>
        </div>
      )}
      {roomSelected?.messages?.length > 0 && (
        <List
          dataSource={[...roomSelected?.messages].reverse() || []}
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
export default MainChatComponent;
