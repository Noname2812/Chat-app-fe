import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { fetchRooms } from "../redux/asyncThunk/roomThunk";
import { getRoomsState, setRoomSelected } from "../redux/reducers/roomReducer";
import { getAuthState } from "../redux/reducers/authReducers";
import { Card } from "antd";
import { reNameRoom } from "../utils/functionHelper";

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
      {rooms?.map((room) => (
        <Card
          key={room.id}
          className={` hover:opacity-90 cursor-pointer ${
            roomSelected?.id === room?.id ? "bg-green-200" : "bg-green-400"
          }`}
          onClick={() => handleChoiceRoom(room)}
        >
          <div>
            <p className="text-xl font-bold">
              {reNameRoom(room.name, user?.name) || room.name}
            </p>
            <p className=" whitespace-nowrap overflow-hidden text-ellipsis">{`${
              room.messages?.[0]?.userId === user.id
                ? `Bạn: ${room.messages?.[0]?.content || "[Hình ảnh]"}`
                : room.messages?.[0]?.content || ""
            }`}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default MenuRoomChats;
