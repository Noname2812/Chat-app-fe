export const validateMessage = (_, value) => {
  if (!value || value.trim() === "") {
    return Promise.reject(new Error("Please input a valid message!"));
  }
  return Promise.resolve();
};
export const validateConfirmPass = (_, value, password) => {
  if (!value || value.trim() === "") {
    return Promise.reject(new Error("Please input a valid message!"));
  } else {
    if (value !== password) {
      return Promise.reject(new Error("Confirm password is not correct!"));
    }
  }
  return Promise.resolve();
};
