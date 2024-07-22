import dayjs from "dayjs";
import { roomApi } from "../api/roomApi";
import {
  createNewRoom,
  getRoomsState,
  setRoomSelected,
} from "../redux/reducers/roomReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { findRoomById, formatTime } from "../utils/functionHelper";
import { Avatar } from "antd";
import { getFriendState } from "../redux/reducers/friendReducer";

const ListFriendsComponent = () => {
  const { listFriends } = useAppSelector(getFriendState);
  const { rooms } = useAppSelector(getRoomsState);
  const dispatch = useAppDispatch();
  const handleChoice = async ({ id, name }) => {
    try {
      const newRoom = {
        id: dayjs().unix() * -1,
        name: "Chat với " + name,
        message: [],
        isPrivate: true,
        to: id,
      };
      const res = await roomApi.getPrivateRoomWithUserId(id);
      if (res.data?.data) {
        if (!findRoomById(rooms, res.data?.data?.id)) {
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
      <h2 className="text-xl font-bold underline">Danh sách bạn bè</h2>
      <div className="flex flex-col gap-2">
        {listFriends?.map((friend) => (
          <div
            className={`p-2 font-bold rounded relative flex gap-2 cursor-pointer hover:opacity-80 ${
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
export default ListFriendsComponent;
