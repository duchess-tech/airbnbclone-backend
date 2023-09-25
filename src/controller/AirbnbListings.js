const category = require("../models/categories")
const Listing = require("../models/listing")


const createPropertyId = async (req, res) => {
  console.log("i am here")
  const { _id } = req.user;

  try {
    const property = await Listing.create({
      host: _id,
    });
    res.status(200).json({ propertyId: property._id });
  } catch (error) {
    res.status(500).json({ message: "please contact the admin " });
    console.log(error)
  }
};

const updatePropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyExist = await Listing.findOne({ _id: id });  //if the property id has been created
    if (!propertyExist) {
      return
      res.status(404).json({ message: `property with id :${id} doesn't exist ` });
    }
    const property = await Listing.findOneAndUpdate({ _id: propertyExist._id }, req.body, { new: true });

    res.status(200).json({ property: property });
  } catch (error) {
    res.status(500).json({ message: "please contact the adminkhllhk " });
  }
};


async function PropertyListing(req, res) {

  const { PlaceDescription, TypeOfPlace, detailNum, Amenities } = req.body
  try {
    const myListing = new Listing({
      PlaceDescription,
      TypeOfPlace,
      detailNum,
      Amenities
    })
    await myListing.save()
    res.status(200).json({ message: "place description selected successfully", myListing })

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: "place description 'NOT 'selected successfully" })
  }

}



const Category = async (req, res) => {
  try {
    const categories = await category.create({ ...req.body });

    res.status(200).json({ property: categories });
  } catch (error) {
    res.status(500).json({ msg: "please contact the admin " });
  }
};



const getAllCategories = async (req, res) => {
  try {
    const categories = await category.find({});
    const newCategories = categories.map((category) => category.structure);
    res.status(200).json({ category: newCategories });
  } catch (error) {
    res.status(500).json({ message: "please contact the admin" });
  }
};

const getAllProperties = async (req, res) => {

  try {
    const Allproperties = []
    const FindAllProperties = await Listing.find({}).populate("host")
    FindAllProperties.forEach(doc => { Allproperties.push(doc) })

    res.status(200).json({ properties: Allproperties });

  }
  catch (error) {
    // res.status(500).json({ message: " Contact the admin " });
    console.log(error)
  }

}

const FindProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyExist = await Listing.findOne({ _id: id });
    if (!propertyExist) {
      return res.status(404).json({ message: `property with id :${id} doesn't exist ` });
    }
    const property = await Listing.findOne({ _id: propertyExist._id, }).populate("host");
    res.status(200).json({ property: property });
    console.log(`property:${property}`)
  } catch (error) {
    res.status(500).json({ message: "please contact the admin " });
    console.log(error)

  }
};

module.exports = { PropertyListing, Category, getAllCategories, createPropertyId, updatePropertyById, FindProperty, getAllProperties }