const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        maxlength : 32,
        unique : true
    }
});



const Category = mongoose.model("Category", categorySchema);
module.exports = Category
module.exports = mongoose.model("Category", categorySchema);