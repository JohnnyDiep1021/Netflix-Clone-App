export const errorValidate = (error) => {
  if (error.toLowerCase().includes("email")) {
    return "email";
  } else if (error.toLowerCase().includes("password")) {
    return "password";
  } else {
    return undefined;
  }
};
