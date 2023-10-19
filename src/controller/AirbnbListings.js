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
    res.status(500).json({ message: "please contact the admin" });
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





const getAllProperties = async (req, res) => {

  try {
    const FindAllProperties = await Listing.find({}).populate("host")

    res.status(200).json({ properties: FindAllProperties });
    console.log("app.js success")

  }
  catch (error) {
    res.status(500).json({ message: " Contact the admin " });
    console.log(error)
    console.log("app.js error")

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

const you = () => {
  console.log("yoo")
}
you()

module.exports = { PropertyListing, createPropertyId, updatePropertyById, FindProperty, getAllProperties }