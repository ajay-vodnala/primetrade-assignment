import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token missing");
  }

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      return res.status(401).send("Unauthorized User"); 
    }
    req.email=payload.email;
    next();
  });
};
