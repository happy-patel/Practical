const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { successResponse, errorResponse } = require('../utils/helper');

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body

    const isExists = await UserModel.exists({ email: email });
    if (isExists) return errorResponse(res, 'User already exists', 403);

    const hashPassword = await bcrypt.hash(password, 8);

    const userObj = {
      name, email, password: hashPassword, phone, address
    }

    const data = await UserModel.create(userObj);

    return successResponse(res, data, 'User register successfull!', 201);
  } catch (error) {
    return errorResponse(res, 'Something went wrong!')
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email: email }).lean();
    if (!user) return errorResponse(res, 'User not found!', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 'Invalid username or password', 401);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    user.token = token;

    delete user.password;
    return successResponse(res, user, 'User Login successfull!', 200);
  } catch (error) {
    return errorResponse(res, 'Something went wrong!')
  }
}