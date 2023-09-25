const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");
const path = require("path")
const { google } = require("googleapis")
const credentials = require('../credentials.json')
const { gmail_password, gmail_user } = require("../config/env")



const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmail_user,
    pass: gmail_password
  }, tls: {
    rejectUnauthorized: false
  }
});
mailer.use("compile", pugEngine({
  templateDir: path.join(__dirname, "../templates"),
  pretty: true
}))

module.exports = mailer