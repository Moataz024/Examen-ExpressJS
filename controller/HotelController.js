const Hotel = require("../models/Hotel");
const Chambre = require("../models/Chambre");

async function AddHotel(req, res) {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.send(hotel);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function FindHotel(req,res){
    try{
        const hotel= await Hotel.find()
        res.send(hotel)
    }catch(err){
        res.status(400).send({ error: error.message });
    }
}

async function getHotelByName(req, res){
    try {
        let name =req.params.name
        const data =await Hotel.findOne({name});
        res.status(200).send(data);
    } catch(err) {
        res.status(400).json({error : err});

    }
}
async function getById(req, res){
    try {
        let id = req.params.id
        const data =await Hotel.findById(id);
        res.status(200).send(data);
    } catch(err) {
        res.status(400).json({error : err});

    }
}

async function updateHotel(req,res){
    try{
        await Hotel.findByIdAndUpdate(req.params.id,req.body);
        res.status(205).send('Updated');
    }catch (error){
        res.status(400).send({ error: error.message });
    }
}

async function removeHotel(req, res) {
    try{
     const id = req.params.id;
     await Hotel.findByIdAndDelete(id);
     res.status(200).json({message:"Hotel with id "+ id +" is successfully deleted"})
    }catch(err){
            return res.status(400).send({ err: "Error on delete."})
        }
}

async function addChambre(req,res){
    try{
        const hotelId = req.params.id;
        let chambre = req.body;
        chambre.hotel = hotelId;
        const ch = await Chambre.create(chambre);
        res.status(200).json(ch);
    }catch (e){
        res.status(400).json({error:e.message});
    }
}

async function reserver(req,res){
    try{
        const id = req.params.id;
        const nomClient = req.params.nom;
        let chambre = await Chambre.findById(id);
        if(chambre.reservee=="false"){
            chambre.nom_client = nomClient;
            chambre.reservee = "true";
            await Chambre.findByIdAndUpdate(id,chambre);
            let c = await Chambre.findById(id);
            res.status(200).json(c);
        }else{
            res.status(201).json({msg:"Chambre deja reservé"})
        }
    }catch(e){
        res.status(400).json({error:e.message})
    }
}
async function reserve(data,io){
    try{
        console.log(data);
        const nomClient = data.nom;
        const id = data.id;
        let chambre = await Chambre.findById(id);
        if(chambre.reservee=="false"){
            chambre.nom_client = nomClient;
            chambre.reservee = "true";
            await Chambre.findByIdAndUpdate(id,chambre);
            let c = await Chambre.findById(id);
            io.emit("reserver",c.toString())
        }else{
            io.emit("reserver","Chambre deja reservé!")
        }
    }catch(e){
        io.emit("reserver","Erreur : "+e.message);
        console.log(e.message);
    }
}

async function afficher(io,id){
    try{
        const chambres = await Chambre.find();
        const data = chambres.filter(chambre=>chambre.reservee == "false" && chambre.hotel==id);
        io.emit("afficher",data.toString());
    }catch (e){
        console.log(e.message);
    }
}


module.exports = {
    AddHotel,
    FindHotel,
    getHotelByName,
    updateHotel,
    removeHotel,
    getById,
    addChambre,
    reserver,
    afficher,
    reserve
}