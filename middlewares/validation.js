const validation = (schema, method = "post") => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    // if (error && method === "put") {
    //   return res.status(400).json({
    //     message: "missing fields",
    //     status: 400
    //   });
    // }
    if (error) {
      return res.status(400).json({
        message: "missing required name field",
        status: 400
      });
    }

    next();
  };
  return func;
};

module.exports = validation;
