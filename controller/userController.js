const User = require("../models/user");

async function AddUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: error.message });
    }
}

async function FindUser(req,res){
    try{
        const user= await User.find()
        res.send(user)
    }catch(err){
        res.status(400).send({ error: error.message });
    }
}

async function getUserByName(req, res){
    try {
        let name =req.params.name
        const data =await User.findOne({name});
        res.status(200).send(data);
    } catch(err) {
        res.status(400).json({error : err});

    }
}

async function updateUser(req,res){
    try{
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.status(205).send('Updated');
    }catch (error){
        res.status(400).send({ error: error.message });
    }
}

async function removeUser(req, res) {
    await User.remove(req.data.user._id)
        .then(()=>{
            return res.send()
        }).catch((err)=> {
            return res.status(400).send({ err: "Error on delete."})
        })
}


module.exports = {
    AddUser,
    FindUser,
    getUserByName,
    updateUser,
    removeUser
}