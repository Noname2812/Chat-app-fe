import { roomApi } from "../api/roomApi";
import { getAuthState } from "../redux/reducers/authReducers";
import {
  createNewRoom,
  getRoomsState,
  setRoomSelected,
} from "../redux/reducers/roomReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { findRoomById, formatTime } from "../utils/functionHelper";
import { Avatar } from "antd";

const ListUserOnline = ({ data }) => {
  const { user, listFriends } = useAppSelector(getAuthState);
  const { rooms } = useAppSelector(getRoomsState);
  const dispatch = useAppDispatch();
  const handleChoice = async ({ id, name }) => {
    try {
      const newRoom = {
        id: Number(user.id + id) * -1,
        name: "Chat với " + name,
        message: [],
        isPrivate: true,
        to: id,
      };
      const res = await roomApi.getPrivateRoomWithUserId(id);

      if (res.data?.data) {
        if (!findRoomById(rooms, Number(res.data?.data?.id))) {
          dispatch(createNewRoom(newRoom));
        } else {
          dispatch(setRoomSelected(res.data?.data));
        }
      } else {
        dispatch(createNewRoom(newRoom));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full ">
      <h2>Danh sách online</h2>
      <div className="flex flex-col gap-2">
        {listFriends?.map((friend) => (
          <div
            className={`p-2 font-bold rounded relative flex gap-2 ${
              friend?.isOnline ? "bg-green-400" : "bg-blue-100"
            }`}
            key={friend.id}
            onClick={() => handleChoice({ id: friend.id, name: friend.name })}
          >
            <Avatar src={friend.avatar} />
            <div className="text-lg">{friend.name}</div>
            {!friend?.isOnline && (
              <div className="absolute bottom-1 right-1">
                <p className="text-xs font-normal">
                  {formatTime(friend?.lastOnline)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUserOnline;
