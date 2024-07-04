import dayjs from "dayjs";

export const replaceMessagesToRoom = ({ rooms, roomId, messages }) => {
  const updatedRooms = rooms.map((room) => {
    if (Number(room?.id) === Number(roomId)) {
      let seenIds = new Set();
      let newMessages = [...room.messages, ...messages];
      let uniqueArr = newMessages.filter((item) => {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          return true;
        }
        return false;
      });

      uniqueArr.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
      return {
        ...room,
        messages: uniqueArr,
      };
    }
    return room;
  });
  return updatedRooms;
};
export const findRoomById = (rooms, roomId) => {
  const room = rooms.find((room) => room.id === roomId);
  return room;
};
export function reNameRoom(fullName, prefix) {
  const arr = fullName?.split("-");
  if (arr?.[0]?.trim() === prefix?.trim()) {
    return "Chat with " + arr[1];
  }
  if (arr?.[1]?.trim() === prefix?.trim()) {
    return "Chat with " + arr[0];
  }
  return null;
}
export const formatTime = (time) => {
  const targetTime = dayjs(time);
  const currentTime = dayjs();
  const differenceInMinutes = currentTime.diff(targetTime, "minute");
  if (differenceInMinutes < 60) {
    return differenceInMinutes === 0
      ? "just now"
      : differenceInMinutes + " minutes ago";
  }
  const differenceInHours = currentTime.diff(targetTime, "hour");
  if (differenceInHours < 24) {
    return differenceInHours + " hours ago";
  }
  const differenceInDays = currentTime.diff(targetTime, "day");
  return differenceInDays + " days ago";
};
