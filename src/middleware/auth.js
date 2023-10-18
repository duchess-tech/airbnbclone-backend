
const jwt = require("jsonwebtoken")
const User = require("../models/usersinfo");
const publicKey = require("../utils/keyholder");



async function auth(req, res, next) {
  let user
  try {
    console.log("caught")

    const token = req.headers.authorization && String(req.headers.authorization).split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "unauthorised 1" });
    }
    console.log("caught2")

    console.log("caught3")

    const decoded = jwt.verify(token, publicKey, { algorithms: "RS256" });
    console.log("caught4")
    console.log(decoded)
    const id = decoded.id
    console.log(id)
    user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(401).json({ message: "unauthorised 2" });
    }
    else {
      req["user"] = user;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }


}
module.exports = auth