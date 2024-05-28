import { useAppSelector } from "../redux/store";
import { getChatState } from "../redux/reducers/chatReducers";
import { findRoomById } from "../utils/functionHelper";

const MainChat = ({ userId, roomId }) => {
  const { rooms } = useAppSelector(getChatState);
  return (
    <div className={`p-4 border border-black h-[700px] flex flex-col gap-1`}>
      {roomId &&
        findRoomById(rooms, roomId)
          ?.messages?.slice()
          .reverse()
          .map((mes) => (
            <div
              key={mes.id}
              className={`flex ${
                userId === mes.user?.id ? "justify-end" : ""
              } p-2 `}
            >
              <div
                style={{ maxWidth: "75%", minWidth: "10%" }}
                className={`p-2 ${
                  userId === mes.user?.id ? "bg-blue-400 " : ""
                } shadow-xl`}
              >
                <p className="text-start">{`${mes.content}`}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default MainChat;
