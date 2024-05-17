const express = require("express")
const router = express.Router()
const Hotel = require("../models/Hotel")
const {
    AddHotel,
    FindHotel,
    getHotelByName,
    updateHotel,
    removeHotel
} = require("../controller/hotelController")
const {validate} = require("../middleware/validator");
const {getById} = require("../controller/HotelController");

router.get("/",(req,res)=>{
    res.render("chat")
})

router.post('/add',validate, AddHotel);

router.get('/list', FindHotel);

router.get('/getbyname/:name',getHotelByName);

router.get('/getById/:id',getById);

router.put('/update/:id',updateHotel);

router.delete('/delete/:id',removeHotel);

module.exports = router;