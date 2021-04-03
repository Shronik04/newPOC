
const Category = require('../models/cat')

module.exports.get_cat = (req, res) => {
    Category.find()
        .then((result) => {
        res.send(result)
        }).catch((err) => {
        res.send(err)
    })
}
module.exports.get_catId = (req, res) => {
    Category.findOne({_id:req.params.id})
        .then((result) => {
        res.send(result)
    }).catch((err)=>{res.status(400).send(err)})
}