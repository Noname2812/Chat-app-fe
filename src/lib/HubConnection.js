import { toast } from "react-toastify";
import { getFriendsOnline } from "../redux/reducers/authReducers";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { store } from "../redux/store";
import { fetchRoomId } from "../redux/asyncThunk/roomThunk";
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
  if (user && conn.connectionState === "disconnected") {
    await conn.start();
    conn.connectionState = "connected";
    conn.invoke("AddUserConnection", {
      userId: user?.id,
      name: user?.name,
    });
    conn.on("NotifyUserOnline", (name) => toast(`${name} was online !`));
    conn.on("GetListUserOnline", (users) => {
      store.dispatch(getFriendsOnline(users));
    });
    conn.on("ReceiveMessagePrivate", (id) => {
      store.dispatch(fetchRoomId({ roomId: id }));
    });
    conn.on("ReceiveMessageFromGroup", (id) => {
      store.dispatch(fetchRoomId({ roomId: id }));
    });
  }
};
const sendMessage = async ({ from, roomId, message, isPrivate }) => {
  try {
    if (conn.connectionState === "connected") {
      await conn.invoke("SendMessage", { from, roomId, message, isPrivate });
    }
  } catch (error) {
    console.log(error);
  }
};
export const HubConnection = {
  connection: async (user) => await connect(user),
  chat: ({ from, roomId, message, isPrivate }) =>
    sendMessage({ from, roomId, message, isPrivate }),
  disconnect: () => {
    if ((conn.connectionState = "connected")) {
      conn.stop();
      conn.connectionState = "disconnected";
    }
  },
};
