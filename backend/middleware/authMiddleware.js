import jwt from "jsonwebtoken";

const SECRET = "mysecretkey123";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader); // debug

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("TOKEN TO VERIFY:", token); // debug

    const decoded = jwt.verify(token, SECRET);

    console.log("DECODED:", decoded); // debug

    req.userId = decoded.id;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message); // debug
    return res.status(401).json({ message: "Invalid token" });
  }

};

export default authMiddleware;