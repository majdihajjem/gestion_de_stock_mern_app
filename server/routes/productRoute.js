const express = require("express");
const formidable = require("formidable");

const router = express.Router();
const product = require("../models/productSchema");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const multer = require("multer");
//multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "my-images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
//@description:add a new Product
//@params:POST /api/v1/products/addProduct
//@access PRIVATE
router.post(
  "/addProduct",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      const { title, desc, Qte } = req.body;
      console.log({file: req.file});
      const imagePath = req.file.path;
      const newProduct = await product.create({
        title,
        desc,
        Qte,
        image: imagePath,
      });
      res.json(newProduct);
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "somthing whent wrong" });
    }
  }
);

//@description:get Products
//@params:GET /api/v1/products/
//@access PRIVATE
router.get("/", authMiddleware, async (req, res) => {
  try {
    const productList = await product.find().sort({createdAt:-1});
    res.json(productList);
  } catch (error) {
    res.status(500).json({ msg: "somthing whent wrong" });
  }
});
//@description:delete Product by id
//@params:Delete /api/v1/products/
//@access PRIVATE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.json("seccess delete");
  } catch (error) {
    res.status(500).json({ msg: "somthing whent wrong" });
  }
});
//@description:update Product by id
//@params:PUT /api/v1/products/
//@access PRIVATE
router.put(
  "/:id",
  authMiddleware,
  upload.single("newPicture"),
  async (req, res) => {
    try {
      const update = { ...req.body };
      if (req.file) update.image = req.file.path;

      console.clear();
      console.log(res.file);

      const newProduct = await product.updateOne(
        { _id: req.params.id },
        update
      );
      res.json({ newProduct, message: "seccess update" });
    } catch (error) {
      res.status(500).json({ msg: "somthing whent wrong" });
    }
  }
);

//@description:update Product image by id
//@params:PUT /api/v1/products/image/:id
//@access PRIVATE
router.put(
  "/image/:id",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      const imagePath = `http://localhost:5000/${req.file.path}`;
      await product.findByIdAndUpdate(req.params.id, { image: imagePath });
      res.json("seccess update");
    } catch (error) {
      res.status(500).json({ msg: "somthing whent wrong" });
    }
  }
);

module.exports = router;
