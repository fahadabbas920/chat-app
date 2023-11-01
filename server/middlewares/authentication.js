const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password } = decode;
    req.user = { email, password };
    next();
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = authentication;
