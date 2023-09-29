import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    // sameSite: "strict", // Prevent CSRF attacks
    // sameSite: "lax",
    //maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // domain: "127.0.0.1",
  });
};
export default generateToken;
