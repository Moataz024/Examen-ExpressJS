const express=require("express")
const http=require("http")
const controller = require('./controller/HotelController')
const bodyparser=require("body-parser")


//database connection
const mongo = require("mongoose")
const config=require('./config/dbconnection.json')
mongo.connect(config.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("database connected")).catch(()=>console.log("Error in db connection"))

const userRouter = require("./routes/users")
const {join} = require("path");

//Socket method
const {addMessage} = require("./controller/messageController");

var app=express()
app.use(bodyparser.json())
app.set("views",join(__dirname,"views"))
app.set("view engine","twig")

app.use("/users", userRouter);
const hotelRouter = require("./routes/HotelRoutes")
app.use('/hotels',hotelRouter);
const chambreRouter = require('./routes/ChambreRoutes');
app.use('/chambres',chambreRouter);

//server config
const server=http.createServer(app)
const io = require("socket.io")(server)
server.listen(3000,()=>console.log('SERVER IS RUNNING ON PORT 3000'))

// WebSocket
io.on("connection",(socket)=>{

    socket.on("afficher",async(id)=>{
        await controller.afficher(socket,id);
    })
    socket.on("reserver",async(data)=>{
        await controller.reserve(data,socket);
    })

    socket.on("disconnect",()=>{
        io.emit("message","user is disconnected")
    })
})




module.exports=app