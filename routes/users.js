const express = require("express")
const router = express.Router()
const User = require("../models/user")
const {
    AddUser,
    FindUser,
    getUserByName,
    updateUser,
    removeUser
} = require("../controller/userController")

router.get("/",(req,res)=>{
    res.render("chat")
})

router.post('/add', AddUser);

router.get('/getall', FindUser);

router.get('/getbyname/:name',getUserByName);

router.put('/update/:id',updateUser);

router.delete('/delete/:id',removeUser);

module.exports = router;