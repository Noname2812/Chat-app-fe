import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { store } from "../redux/store";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
import { getListAddFriendRequests } from "../redux/asyncThunk/userThunk";
import { toast } from "react-toastify";
import { getFriendsOnline } from "../redux/reducers/friendReducer";
const conn = new HubConnectionBuilder()
  .withUrl("http://localhost:5264/hub")
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();
const connect = async (user) => {
  try {
    await conn.start();
    conn.connectionState = "connected";
    await conn.invoke("AddUserConnection", {
      userId: user?.id,
      name: user?.name,
      avatar: user?.avatar,
    });
    conn.on("ListFriendsOnline", (friends) => {
      store.dispatch(getFriendsOnline(friends));
    });
    conn.on("ReceiveMessagePrivate", (id) => {
      store.dispatch(fetchRoomId({ roomId: id }));
    });
    conn.on("ReceiveMessageFromGroup", (id) => {
      store.dispatch(fetchRoomId({ roomId: id }));
    });
    conn.on("NotifyRevicedAddFriendRequest", (user) => {
      toast.success(user.name + " vừa gửi lời mới kết bạn !");
      store.dispatch(getListAddFriendRequests({ offset: 0, limit: 10 }));
    });
    conn.on("NotifyAcceptedAddFriendRequest", (user) => {
      toast.success(user.name + " đã chấp nhận lời mời kết bạn");
      store.dispatch(getListAddFriendRequests({ offset: 0, limit: 10 }));
    });
  } catch (error) {
    console.log(123);
  }
};
export const HubConnection = {
  connection: async (user) => await connect(user),
  disconnect: () => {
    conn.stop().catch((err) => console.log(err));
  },
};
