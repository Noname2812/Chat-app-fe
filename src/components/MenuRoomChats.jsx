import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchRooms } from "../redux/thunkApi";
import { getChatState } from "../redux/reducers/chatReducers";
import { useEffect } from "react";

const MenuRoomChats = ({ roomSelected, setRoomSelected, userId }) => {
  const { rooms } = useAppSelector(getChatState);
  const dispatch = useAppDispatch();

  const handleChooseRoom = (id) => {
    setRoomSelected(id);
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
            roomSelected === room?.id ? "bg-green-200" : "bg-green-400"
          }`}
          onClick={() => handleChooseRoom(room.id)}
        >
          <div>
            <p className="text-xl font-bold">{room.name}</p>
            <p>{`${
              room.messages?.[0]?.user?.id === userId
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
