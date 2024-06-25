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
  const arr = fullName.split("-");
  console.log(arr);
  if (arr[0]?.trim() === prefix?.trim()) {
    return "Chat with " + arr[1];
  }
  if (arr[1]?.trim() === prefix?.trim()) {
    return "Chat with " + arr[0];
  }
  return null;
}
