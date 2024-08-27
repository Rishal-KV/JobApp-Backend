import bcrypt from "bcrypt";

export const helpBcrypt = (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

export const helpVerify = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};
