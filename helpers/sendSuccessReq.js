const sendSuccessReq = (res, data, status = 200) => {
  res.status(status).json({
    data,
    status
  });
};

module.exports = sendSuccessReq;
