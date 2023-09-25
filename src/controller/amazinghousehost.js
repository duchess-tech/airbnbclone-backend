const bcrypt = require("bcrypt")
const multer = require("multer")
const { Cloud_name, Api_key, Api_secret } = require("../config/env")
const ev = require('../Events/emailhandler')
const path = require("path")
const formidable = require("formidable")
const fs = require("fs")
const cloudinary = require('cloudinary').v2
const mongoose = require("mongoose")
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
            // console.log(`files:${JSON.stringify(imagesfile)}`)
            const imagesUrl = []
            for (let index = 0; index < imagesfile.length; index++) {
                imagesUrl.push(imagesfile[index].filepath);
            }
            const uploadedimages = []
            const propertyImages = []
            for (let i = 0; i < imagesUrl.length; i++) {
                const uploadResponse = await cloudinary.uploader.upload(imagesUrl[i], { folder: foldername }, async (error, result) => {
                    if (error) {
                        console.log(error)
                        return;
                    }
                    else {

                        uploadedimages.push(result);
                        for (let index = 0; index < uploadedimages.length; index++) {
                            propertyImages.push(uploadedimages[index].secure_url);
                        }

                        console.log(propertyImages)
                        await Listing.findOneAndUpdate(
                            { _id: propertyExist._id },
                            { photos: propertyImages },
                            { new: true },
                        )
                            .then(savedinfo => {
                                res.status(200).json({ message: "uploaded to mongodb successfull" })
                            })
                            .catch(error => {
                                cloudinary.uploader.destroy(result.public_id)

                            })


                    }

                })





            }


            //         console.log("successfully uploaded to the cloudinary")

            //        
            //         console.log(propertyImages)


            //             .catch(error => {
            //                 console.log(error)
            //                 cloudinary.uploader.destroy(result.public_id, (error, result) => {
            //                     if (error) {
            //                         console.log("Delete image from cloudinary not successfully")
            //                     }
            //                     else {
            //                         console.log("Image deleted from cloudinary successfully")

            //                     }
            //                 })
            //             })
            //     }
            // })
















        })
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