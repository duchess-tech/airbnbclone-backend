const { Schema, model } = require("mongoose")
const userschema = new Schema(
    {
        firstname: {
            type: Schema.Types.String,
        },
        lastname: {
            type: Schema.Types.String,
        },
        birthdate: {
            type: Schema.Types.String,
        }
        ,
        email: {
            type: Schema.Types.String,
            unique: true,
        }

    },
    {
        timestamps: true
    }

)

const USER = model("appusers", userschema)
module.exports = USER
