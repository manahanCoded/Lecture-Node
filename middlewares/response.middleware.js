const responseMiddleware = (req, res, next) => {
  if (res.err) {
    return res.status(400).json({
      error: true,
      message: res.err.message
    });
  }
  
  if (res.data) {
    return res.status(200).json(res.data);
  }
  
  next();
};

export { responseMiddleware };