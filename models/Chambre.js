const mongo=require("mongoose")
const Schema=mongo.Schema
const Chambre=new Schema({
    numero:Number,
    hotel:String,
    reservee:{
        type:String,
        default:'false'
    },
    nom_client:{
        type:String,
        default:''
    },
})
module.exports=mongo.model("chambre", Chambre )// parametre loul esm el collection