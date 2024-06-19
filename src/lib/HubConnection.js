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

const connect = async (user) => {
  if (user) {
    await conn.start();
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
  if (conn.connectionId !== null) {
    await conn.invoke("SendMessage", { from, roomId, message, isPrivate });
  }
};
export const HubConnection = {
  connection: async (user) => await connect(user),
  chat: ({ from, roomId, message, isPrivate }) =>
    sendMessage({ from, roomId, message, isPrivate }),
  disconnect: () => conn.stop(),
};
