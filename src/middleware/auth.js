const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")
// const User = require("../models/airbnbuser")
const User = require("../models/usersinfo")



async function auth(req, res, next) {
  try {
    console.log("caught")

    const token = String(req.headers.authorization).split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "unauthorised1" });
    }

    const publicKey = fs.readFileSync(path.join(__dirname, "../public.pem"));
    const decoded = jwt.verify(token, publicKey, { algorithms: "RS256" });
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ msg: "unauthorised2" });
    }
    req["user"] = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ messagee: "unauthorised3" });
  }


}
module.exports = auth