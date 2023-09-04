import { UserModel } from '../models/user.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signin user
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signin(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Signup user
export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw Error('Email is invalid');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const user = await UserModel.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
