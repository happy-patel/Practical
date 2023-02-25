exports.successResponse = (res, data, message, code) => {
  res.status(code).send({
    code,
    success: true,
    message,
    data
  })
}
exports.errorResponse = (res, message, code = 500) => {
  res.status(code).send({
    code,
    success: false,
    message,
    data: null
  })
}