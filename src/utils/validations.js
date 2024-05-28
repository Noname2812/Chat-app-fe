export const validateMessage = (_, value) => {
  if (!value || value.trim() === "") {
    return Promise.reject(new Error("Please input a valid message!"));
  }
  return Promise.resolve();
};
