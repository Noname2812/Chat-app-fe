import { roomApi } from "../api/roomApi";

const ListUserOnline = ({ data }) => {
  const handleChoice = async (id) => {
    try {
      const res = await roomApi.getPrivateRoomWithUserId(id);
      if (!res.data?.data) {
        // create new room local
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
            onClick={() => handleChoice(user.userId)}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUserOnline;
