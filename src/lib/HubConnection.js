import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { store } from "../redux/store";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
import { getFriendsOnline } from "../redux/reducers/authReducers";
import { getListAddFriendRequests } from "../redux/asyncThunk/userThunk";
import { toast } from "react-toastify";
const conn = new HubConnectionBuilder()
  .withUrl("http://localhost:5264/hub")
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();
conn.connectionState = "disconnected";
conn.onreconnected(() => {
  conn.connectionState = "connected";
});
conn.onclose(() => {
  conn.connectionState = "disconnected";
});
const connect = async (user) => {
  try {
    if (user && conn.connectionState === "disconnected") {
      await conn.start();
      conn.connectionState = "connected";
      conn.invoke("AddUserConnection", {
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
    }
  } catch (error) {
    console.log(error);
  }
};
export const HubConnection = {
  connection: async (user) => await connect(user),
  disconnect: () => {
    if ((conn.connectionState = "connected")) {
      conn.stop().catch((err) => console.log(err));
      conn.connectionState = "disconnected";
    }
  },
};
