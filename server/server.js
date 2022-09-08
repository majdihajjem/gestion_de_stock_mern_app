const express = require("express");
const path = require("path");

const app = express();
require("dotenv").config();
require("./config/connectDB");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pour filtrer l'acces a notre serveur
const cors = require("cors");
app.use(cors());

//routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/products", require("./routes/productRoute"));

app.use("/my-images", express.static("my-images"));
//create a server
app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(express.static(path.join(__dirname, "../client/build")));
