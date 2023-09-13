const mongoose = require('mongoose')


module.exports = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/business-me");
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Error", error.message);
    }
}

