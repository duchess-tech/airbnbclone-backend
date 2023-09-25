const { Schema, model } = require("mongoose")
const listingschema = new Schema(
    {

        PlaceDescription: {
            type: Schema.Types.String,
        }
        ,
        TypeOfPlace: {
            type: Schema.Types.String,
        }
        ,
        vissibility: {
            type: Schema.Types.String,
        },
        detailNum: {
            guest: {
                type: Schema.Types.Number,
            },
            bedroom: {
                type: Schema.Types.Number,
            },
            bed: {
                type: Schema.Types.Number,
            },
            bathroom: {
                type: Schema.Types.Number,
            }

        }
        ,

        Amenities: {
            type: [],
        }
        ,
        photos: {
            type: [],
        },
        additionalDescription: {
            type: [],

        },

        price: {
            type: Schema.Types.String,
        }
        ,

        PropertyTitle: {
            type: Schema.Types.String,
        },
        host: {
            type: Schema.Types.ObjectId,
            ref: "appusers",
        }
    },
    {
        timestamps: true
    }

)

const Listing = model("propertydetails", listingschema)
module.exports = Listing
