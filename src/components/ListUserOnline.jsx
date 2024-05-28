import { useAppSelector } from "../redux/store";
import { getChatState } from "../redux/reducers/chatReducers";
import { getAuthState } from "../redux/reducers/authReducers";

const ListUserOnline = ({ data, setRoomSelected }) => {
  const { hubConnection } = useAppSelector(getChatState);
  const { user } = useAppSelector(getAuthState);
  const handleOnClick = async (id) => {
    if (hubConnection) {
      await hubConnection.invoke("JoinPrivateRoomChat", {
        from: user.id,
        to: id,
      });
    }
  };
  return (
    <div className="w-1/4">
      <h2>Danh sách online</h2>
      <div className="flex flex-col gap-2">
        {data?.map((user) => (
          <div
            className="bg-blue-100 py-4 px-2 font-bold"
            key={user.connectionId}
            onClick={() => handleOnClick(user.userId)}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUserOnline;
