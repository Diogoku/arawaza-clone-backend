import express from "express";
const router = express.Router();
import Product from "../models/products.js";

// GET -> ALL PRODUCTS
router.get("/", (req, res) => {
  Product.find({})
    .then((products) => {
      if (products)
        res.status(200).send({ products: products, msg: "Products returned" });
      else res.status(200).send({ products: [], msg: "There are no products" });
    })
    .catch((error) => res.status(500));
});

// GET -> ONE PRODUCT
router.get("/:productId", (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (product) res.status(200).send(product);
      else res.status(404).send("Product not found");
    })
    .catch((error) => {
      res.send(`Error fetching produtc with ID: ${req.params.productId}`);
    });
});

// POST -> CREATE PRODUCT
router.post("/", (req, res) => {
  Product.findOne({ name: req.body.name }).then((existingProduct) => {
    if (existingProduct) res.status(200).send("Product already exists!");
    else {
      new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        imageHover: req.body.imageHover,
        link: req.body.link,
        createdAt: Date.now(),
      })
        .save()
        .then((newProduct) => res.status(201).send(newProduct));
    }
  });
});

// UPDATE -> PRODUCT NAME
router.put("/:productId/name", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { name: req.body.name } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product name!",
        });
    }
  );
});

// UPDATE -> PRODUCT PRICE
router.put("/:productId/price", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { price: req.body.price } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product price!",
        });
    }
  );
});

// UPDATE -> PRODUCT DESCRIPTION
router.put("/:productId/description", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { description: req.body.description } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product description!",
        });
    }
  );
});

// UPDATE -> PRODUCT THUMBNAIL
router.put("/:productId/thumbnail", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { thumbnail: req.body.thumbnail } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product thumbnail!",
        });
    }
  );
});

// UPDATE -> PRODUCT IMAGEHOVER
router.put("/:productId/imageHover", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { imageHover: req.body.imageHover } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product image hover!",
        });
    }
  );
});

// UPDATE -> PRODUCT LINK
router.put("/:productId/link", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.productId,
    { $set: { link: req.body.link } },
    {
      new: true,
    },
    (err, product) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else
        res.status(200).send({
          product: product,
          message: "Successfully updated product link!",
        });
    }
  );
});

// DELETE -> ALL PRODUCT
router.delete("/", (req, res) => {
  Product.deleteMany({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

// DELETE -> DELETE PRODUCT BY ID
router.delete("/:productId", (req, res) => {
  Product.findByIdAndRemove(req.params.productId, (err) => {
    if (err) console.log(err);
    else
      res
        .status(200)
        .send(`Product with id ${req.params.productId} successfully deleted`);
  });
});

export default router;
