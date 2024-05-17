const express = require("express")
const router = express.Router()
const Hotel = require("../models/Hotel")
const {
    addChambre,
    reserver
} = require("../controller/hotelController")

router.post('/add/:id',addChambre);
router.put('/reserve/:id/:nom',reserver);
router.get("/",(req,res)=>{
    res.render("page")
})
module.exports = router;