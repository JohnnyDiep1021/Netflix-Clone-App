const jwt = require("jsonwebtoken");
const User = require("../db/model/User");

const auth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error(`Please authenticate!`);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    error.status = error.status || 401;
    next(error);
  }
};

module.exports = auth;
