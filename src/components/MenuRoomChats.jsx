import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { fetchRoomId, fetchRooms } from "../redux/asyncThunk/roomThunk";
import { getRoomsState } from "../redux/reducers/roomReducer";
import { getAuthState } from "../redux/reducers/authReducers";
import { Card } from "antd";

const MenuRoomChats = ({ onClick, roomIdSelectd }) => {
  const { rooms } = useAppSelector(getRoomsState);
  const { user } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const handleChoiceRoom = (roomId) => {
    if (roomIdSelectd !== roomId || !roomIdSelectd) {
      dispatch(fetchRoomId({ roomId }));
      onClick(roomId);
    }
  };
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  return (
    <div className="w-1/4">
      {rooms?.map((room) => (
        <Card
          key={room.id}
          className={` hover:opacity-90 cursor-pointer ${
            roomIdSelectd === room?.id ? "bg-green-200" : "bg-green-400"
          }`}
          onClick={() => handleChoiceRoom(room.id)}
        >
          <div>
            <p className="text-xl font-bold">{room.name}</p>
            <p>{`${
              room.messages?.[0]?.user?.id === user.id
                ? `Bạn: ${room.messages?.[0]?.content}`
                : room.messages?.[0]?.content || ""
            }`}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default MenuRoomChats;
