const {BadRequest, UnAuthenticatedError} = require('../errors/index');
const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res,next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new BadRequest('Token required!');
  }
  const token = authHeaders.split(" ")[1];
  //console.log(token);
  //authentication
  try {
    const Decoded = JWT.verify(token, process.env.JSONWEBSIGNKEY, {
      expiresIn: "30d",
    });
    //console.log(Decoded);
    const {id, username} = Decoded;
    req.user = {id:id, username:username};
    //console.log(req.user);
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Not authorize to access this route");
  }
};

module.exports = authMiddleware;