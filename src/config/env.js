require("dotenv").config()
const { MONGO_URL, PORT, Cloud_name, Api_key, Api_secret, VONAGE_API_SECRET, TO_NUMBER, VONAGE_BRAND_NAME, gmail_password, gmail_user } = process.env
module.exports = { MONGO_URL, PORT, Cloud_name, Api_key, Api_secret, VONAGE_API_SECRET, TO_NUMBER, VONAGE_BRAND_NAME, gmail_password, gmail_user }