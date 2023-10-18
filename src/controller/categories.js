const Listing = require("../models/listing");



const GetCategory = async (req, res) => {
    try {
        const category = req.query.placeDescription
        const properties = category ? await Listing.find({ PlaceDescription: category }).populate("host") : []
        res.status(200).json({ category: properties });
    }
    catch (error) {
        res.status(500).json({ message: "please contact the admin " });
    }


}

// }

// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await categories.find({});
//         const newCat = categories.map((category) => category.PlaceDescription);
//         res.status(200).json({ category: newCat });
//     } catch (error) {
//         res.status(500).json({ message: "please contact the admin " });
//     }
// };
module.exports = { GetCategory };
