const mongo=require("mongoose")
const Schema=mongo.Schema
const Hotel=new Schema({
    nom:String,
    adresse:String,
    email:String,
    nbChambre:Number,
})
module.exports=mongo.model("hotel", Hotel )// parametre loul esm el collection