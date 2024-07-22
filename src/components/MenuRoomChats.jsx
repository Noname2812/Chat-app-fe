import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { fetchRooms } from "../redux/asyncThunk/roomThunk";
import { getRoomsState, setRoomSelected } from "../redux/reducers/roomReducer";
import { getAuthState } from "../redux/reducers/authReducers";
import { Avatar, Card, Image } from "antd";
import { getImageRoomChat, getNameRoomChat } from "../utils/functionHelper";

const MenuRoomChats = () => {
  const { rooms, roomSelected } = useAppSelector(getRoomsState);
  const { user } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const handleChoiceRoom = (room) => {
    if (roomSelected?.id !== room.id || !roomSelected) {
      dispatch(setRoomSelected(room));
    }
  };
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  return (
    <div className="w-full">
      {rooms?.length > 0 &&
        rooms?.map((room) => (
          <Card
            bordered={false}
            key={room.id + room.name}
            className={` hover:opacity-90  cursor-pointer ${
              roomSelected?.id === room?.id ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => handleChoiceRoom(room)}
          >
            <div className="flex gap-2">
              <div>
                <Avatar
                  size={32}
                  icon={
                    <Image
                      preview={false}
                      src={getImageRoomChat(room, user.id)}
                    />
                  }
                />
              </div>
              <div className="max-w-[80%]">
                <p className="text-xl font-bold">
                  {getNameRoomChat(room, user.id)}
                </p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{`${
                  room.messages?.[0]?.userId === user.id
                    ? `Bạn: ${room.messages?.[0]?.content || "[Hình ảnh]"}`
                    : room.messages?.[0]?.content || ""
                }`}</p>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};
export default MenuRoomChats;
