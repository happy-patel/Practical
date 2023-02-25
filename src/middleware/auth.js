const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse } = require("../utils/helper");

exports.authentication = async (req, res, next) => {
  if (!(req.headers && req.headers.authentication)) return errorResponse(res, 'No token provided!', 401)

  const token = req.header('authentication').replace('Bearer ', '');
  let decoded;
  try {
    decoded = jwt.decode(token);
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.message === 'jwt expired') return errorResponse(res, 'Token expired!', 401);

    return errorResponse(res, error.message, 401)
  }

  const user = await UserModel.findOne({ _id: decoded.userId })
  if (!user) return errorResponse(res, 'User not found!', 404);

  req.user = user

  return next();
}