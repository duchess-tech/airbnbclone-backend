
const { Cloud_name, Api_key, Api_secret } = require("../config/env")
const formidable = require("formidable")
const cloudinary = require('cloudinary').v2
const Listing = require("../models/listing")


cloudinary.config({
    cloud_name: Cloud_name,
    api_key: Api_key,
    api_secret: Api_secret,
});

async function UploadPropertyImage(req, res) {
    const foldername = "hostimages"
    const email = req.body.email
    console.log("im here")

    try {
        const { id } = req.params;
        const propertyExist = await Listing.findOne({ _id: id });
        if (!propertyExist) {
            return res
                .status(404)
                .json({ msg: `property with id :${id} doesn't exist ` });
        }

        const form = formidable();


        form.parse(req, async (err, fields, files) => {
            if (err) throw new Error(err);

            const imagesfile = Object.values(files);
            const imagesUrl = imagesfile.map(file => file.filepath);

            let propertyImages = [];

            for (let url of imagesUrl) {
                try {
                    const result = await cloudinary.uploader.upload(url, { folder: foldername });
                    propertyImages.push(result.secure_url);
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                }
            }

            if (propertyImages.length) {
                try {
                    await Listing.findOneAndUpdate(
                        { _id: propertyExist._id },
                        { photos: propertyImages },
                        { new: true }
                    );
                    res.status(200).json({ message: "uploaded to mongodb successfully" });
                } catch (error) {
                    console.error("Error updating MongoDB:", error);
                    res.status(500).json({ message: "Error updating database" });
                }
            } else {
                res.status(500).json({ message: "No images uploaded" });
            }
        });
        // mongoose.connection.close()


    }



    catch (error) {
        res.status(500).json({ message: "server error,please try again" })
    }
}


// async function Createuser(req, res) {
//     const { firstname, lastname, username, email, password } = req.body
//     const hashedpassword = await bcrypt.hash(req.body.password)
//     //set user info
//     try {
//         await hostuser.create({
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             password: hashedpassword,
//         })

//         ev.emit("log", req.body.firstname, req.body.lastname, req.body.email)
//         res.status(200).json({ message: "Account created" })
//     }
//     catch (err) {
//         res.status(409).json({ message: "Account not created try again" })
//     }
// }

// async function All(req, res) {

//     try {
//         const data = await hostuser.find().select("email image")
//         res.status(200).json(data)

//         console.log("all data found in the database")

//     }
//     catch (error) {
//         res.status(500).json({ message: "something unexpected happened.please contact admin" })

//     }
// }







module.exports = { UploadPropertyImage }