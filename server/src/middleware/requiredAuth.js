import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

const requiredAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required!' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await UserModel.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unauthorized request!' });
  }
};

export default requiredAuth;
