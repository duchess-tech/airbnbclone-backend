
const Event = require("events")
const mailer = require("../config/email")
ev = new Event.EventEmitter()
const { gmail_user } = require("../config/env")



ev.on("signin", (text, email) => {
    const signin_option = {
        subject: "AccessToken",
        from: gmail_user,
        to: email,
        template: "signin",
        ctx: {
            text: text,
        }
    }


    mailer.sendMail(signin_option, (error, result) => {
        if (error) {
            console.log(error)
        }
        else (
            console.log("mail sent succesfully")
        )
        mailer.close()
    })
})

ev.on("login", (firstname, lastname, email) => {
    mailer.sendMail({
        subject: "AMAZINGHOMES",
        from: gmail_user,
        to: email,
        template: "login",
        ctx: {
            firstname: firstname,
            lastname: lastname,
            email: email
        }
    })
})


ev.on("registered", (message,email) => {
    mailer.sendMail({
        subject: "AMAZINGHOMES",
        from: gmail_user,
        to: email,
        template: "register",
        ctx: {
           message:message
        }
    })
})
module.exports = { ev }