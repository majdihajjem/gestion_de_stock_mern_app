const express=require("express");
const app = express();
require("dotenv").config()
require('./config/connectDB')
app.use(express.json());
//routes
app.use('/api/v1/users', require('./routes/userRoute'))
//create a server
app.listen(process.env.PORT,()=>console.log('listening on port '+process.env.PORT))