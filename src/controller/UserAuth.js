const userEmail = require("../models/userEmail")
const { ev } = require("../Events/emailhandler")
const userInfo = require("../models/usersinfo")
const jwt = require("jsonwebtoken")
const fs = require('fs')
const path=require("path")
const createJWT = require("../utils/jwebtoken")

async function EmailOtp(req, res) {
    try {
        const email = await req.body.Email
        console.log(email)
        const newOtp = Math.floor(10000 + Math.random() * 900000)
        const text = `welcome to Airbnb ${email} , please verify your email with the ${newOtp}`
        const existingEmail = await userEmail.findOne({ email: email })
        if (!existingEmail) {
            await userEmail.create({
                email: email,
                otp: newOtp,
                createdAt: Date.now(),
                expirededAt: Date.now() + 3600000
            })
            ev.emit("signin", text, email)
            res.status(200).json({ message: "otp sent successfully" })
        }
        await userEmail.findOneAndUpdate(
            { email: email },
            { otp: newOtp },
            { new: true }
        )
        ev.emit("signin", text, email)
        res.status(200).json({ message: "otp sent successfully", email: email })
    }
    catch (err) {
        res.status(500).json({ message: "please contact the admin" })
        console.log(err)

    }

}



const verifyOtp = async (req, res) => {
    try {
        const { userOtp } = req.body
        const userFound = await userEmail.findOne({ otp: userOtp })
        if (!userFound) {
            res.status(403).json({ message: "incorrect otp" })
            return
        }
        else if (userFound) {
            const userEmailFound = userFound.email
            const userRegistered = await userInfo.findOne({ email: userEmailFound })
            if (!userRegistered) {
                res.status(403).json({ message: 'Please proceed to register' })
                return
            }

            else if (userRegistered) {
                const privateKey = fs.readFileSync(path.join(__dirname, "../private.pem"))
                const payload = {
                    id:userFound._id
                }
                const token = jwt.sign(payload, privateKey, { algorithm: "RS256" })
                res.status(200).json({ token: token})
            }
        }

    }
    catch (err) {
        res.status(500).json({ message: "please contact the admin" })
        console.log(err)
    }

}
async function Createtheuser(req, res) {
 const { firstname, lastname, birthdate, email } =  await req.body
    try {
     const user =   await userInfo.create({
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            email: email,
        })
    const message = `welcome to Airbnb ${user.firstname}, enjoy your experience with Airbnb`;
    ev.emit("registered", message, user.email);
        const token = createJWT(user._id);
        console.log(token)
    res.status(200).json({ token, user , message: "account created"})
    }
    catch (error) {
        console.log(error)
        res.status(409).json({ message: "account not created" })
    }

    // res.json({ redirectroute: "/login" })
}
const getTheUser = async (req, res) => {
    const { _id } = req.user;
    try {
      const user = await userInfo.findOne({ _id: _id });
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: "please contact the admin" });
    }
  };

module.exports = { EmailOtp, verifyOtp, Createtheuser, getTheUser }
