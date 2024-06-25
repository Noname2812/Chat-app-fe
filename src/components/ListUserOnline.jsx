import { roomApi } from "../api/roomApi";
import { getAuthState } from "../redux/reducers/authReducers";
import {
  createNewRoom,
  getRoomsState,
  setRoomSelected,
} from "../redux/reducers/roomReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { findRoomById } from "../utils/functionHelper";

const ListUserOnline = ({ data }) => {
  const { user } = useAppSelector(getAuthState);
  const { rooms } = useAppSelector(getRoomsState);
  const dispatch = useAppDispatch();
  const handleChoice = async ({ id, name }) => {
    try {
      const res = await roomApi.getPrivateRoomWithUserId(id);
      if (!res.data?.data) {
        // create new room local
        const newRoom = {
          id: Number(user.id + id) * -1,
          name: "Chat với " + name,
          message: [],
          isPrivate: true,
          to: id,
        };
        if (!findRoomById(rooms, Number(user.id + id) * -1)) {
          dispatch(createNewRoom(newRoom));
        }
      } else {
        dispatch(setRoomSelected(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-1/4 ">
      <h2>Danh sách online</h2>
      <div className="flex flex-col gap-2">
        {data?.map((friend) => (
          <div
            className="bg-blue-100 py-4 px-2 font-bold rounded"
            key={friend.connectionId}
            onClick={() =>
              handleChoice({ id: friend.userId, name: friend.name })
            }
          >
            {friend.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUserOnline;
