const express=require("express");
const app = express();
require("dotenv").config()
require('./config/connectDB')
app.use(express.json());
//pour filtrer l'acces a notre serveur
const cors=require('cors')
app.use(cors('http://localhost:3000'))
//routes
app.use('/api/v1/users', require('./routes/userRoute'))
//create a server
app.listen(process.env.PORT,()=>console.log('listening on port '+process.env.PORT))