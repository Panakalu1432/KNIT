const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const ApiError = require('../utils/ApiError');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const signToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};


exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 8) {
    return next(new ApiError(400, 'Email and password (min 8 chars) are required.'));
  }

  try {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) return next(new ApiError(400, 'Email already registered.'));

    const userId = await userModel.create(email, password);
    const user = await userModel.findById(userId);

    const token = await signToken(user.id, user.role);

    res.status(201).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError(400, 'Please provide email and password.'));

  try {
    const user = await userModel.findByEmail(email);
    if (!user) return next(new ApiError(401, 'Invalid email or password.'));

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return next(new ApiError(401, 'Invalid password.'));

    const token = signToken(user.id, user.role);
    res.status(200).json({ status: 'success', token, data: user });
  } catch (err) {
    next(err);
  }
};
