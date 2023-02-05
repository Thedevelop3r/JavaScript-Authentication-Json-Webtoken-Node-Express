// -------------------------
// -------------------------
// main controller functions
// -------------------------
//---------------------------
//--- neccessary middleware---

require("dotenv");
const { BadRequest } = require("../errors");
const JWT = require("jsonwebtoken");

const login = async (req, res) => {
  // console.log(JWT);
  const { username, password } = req.body;
  if (!username || !password) {
    // we will use our Custom Error
    throw new BadRequest("please provide username and password !");
    // manual error------->
    // return res.status(400).send('username or password must be provided');
  }
  // json web token sign
  const id = new Date().getDate();

  const token = JWT.sign({ id, username }, process.env.JSONWEBSIGNKEY, {
    expiresIn: "30d",
  });
  res.status(200).json({
    username: username,
    token: token,
    msg: `Hey ${username}, Auth created`,
  });
};

//-------DASHBOARD---------

const dashboard = async (req, res) => {
  const { id, username } = req.user;

  let vaultNumber = Math.floor(Math.random() * 4000 + 2112);

  res.status(200).json({
    msg: `hellow ${username}`,
    secret: `Here is your vault number ${vaultNumber}`,
  });
};

module.exports = { login, dashboard };
