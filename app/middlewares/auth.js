import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const autheticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .redirect('/')
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
}