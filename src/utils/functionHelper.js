export const replaceMessagesToRoom = (rooms, roomId, messages) => {
  const updatedRooms = rooms.map((room) => {
    if (Number(room.id) === Number(roomId)) {
      return {
        ...room,
        messages: messages?.messages,
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
