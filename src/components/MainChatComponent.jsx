import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, List } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getAuthState } from "../redux/reducers/authReducers";
import { getRoomsState } from "../redux/reducers/roomReducer";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
import { getChatState } from "../redux/reducers/chatReducers";
import MessageComponent from "./MessageComponent";
const MainChatComponent = () => {
  const { user } = useAppSelector(getAuthState);
  const { roomSelected, isLoadingRoomSelected } = useAppSelector(getRoomsState);
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
    if (chatting === "Completed" && roomSelected && !isLoadingRoomSelected) {
      if (ref?.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
      if (roomSelected.id < 0) {
        return;
      }
      dispatch(fetchRoomId({ roomId: roomSelected?.id }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chatting, isLoadingRoomSelected]);

  useEffect(() => {
    const scrollableDiv = ref.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <MessageComponent user={user} data={item} />
            </div>
          )}
        />
      )}
    </div>
  );
};
export default MainChatComponent;
