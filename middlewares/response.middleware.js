const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const statusCode = res.statusCode || 400;
    return res.status(statusCode).json({
      error: true,
      message: res.err.message
    });
  }
  
  if (res.data === undefined || res.data === null) {
    return res.status(404).json({
      error: true,
      message: "Data not found"
    });
  }
  
  if (res.data) {
    return res.status(200).json(res.data);
  }
  
  next();
};

export { responseMiddleware };