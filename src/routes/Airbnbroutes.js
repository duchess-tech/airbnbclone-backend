const { Router } = require("express")
const { EmailOtp, Createtheuser, verifyOtp, getTheUser } = require("../controller/UserAuth")
const router = Router()
// const multer = require("multer")
const { PropertyListing, createPropertyId, updatePropertyById, FindProperty, getAllProperties } = require("../controller/AirbnbListings.js")
const auth = require("../middleware/auth")
const { UploadPropertyImage } = require("../controller/amazinghousehost")
const { GetCategory } = require("../controller/categories")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./photo")
//     },

//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/JPG") {
//         cb(null, true)
//     }
//     cb(null, false)

// }
// const uploadimage = multer({
//     //  dest:"./images",
//     storage: storage,
//     limits: { fileSize: 5000000 },
//     fileFilter: filefilter,
// })
router.post("/email", EmailOtp)
router.post("/createuser", Createtheuser)
router.post("/mylisting", PropertyListing)
router.post("/verifyotp", verifyOtp)
router.post("/propertyid", [auth], createPropertyId)
router.post("/updatepropertybyid/:id", [auth], updatePropertyById)
router.post("/imageupload/:id", [auth], UploadPropertyImage)
router.post("/getuser", [auth], getTheUser)
router.get("/findproperty/:id", [auth], FindProperty)
router.get("/getallproperties", getAllProperties)
router.get("/getcategories", GetCategory)


module.exports = router