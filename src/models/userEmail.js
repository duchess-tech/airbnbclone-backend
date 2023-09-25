const { Schema, model } = require("mongoose")
const userEmailschema = new Schema(
    {
        email: {
            type: Schema.Types.String
        },
        otp: {
            type: Schema.Types.String
        },
        createdAt: {
            type: Schema.Types.Date

        },
        expirededAt: {
            type: Schema.Types.Date

        }
    },
    {
        timestamps: true
    }

)

const AirbnbuserEmail = model("userEmail", userEmailschema)
module.exports = AirbnbuserEmail
