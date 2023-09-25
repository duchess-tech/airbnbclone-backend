const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const createJWT = (id) => {
  const privateKey = fs.readFileSync(path.join(__dirname, "../private.pem"));
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  return token;
};

module.exports = createJWT;