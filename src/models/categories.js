const { Schema, model } = require("mongoose")
const categoryschema = new Schema(
    {
        structure: {
            type: Schema.Types.String
        }
    }

)

const category = model("categories", categoryschema)
module.exports = category
