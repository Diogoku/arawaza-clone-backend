import express from "express";
const router = express.Router();
import User from "../models/user.js";

// LOGIN OR SIGN UP
router.post("/", (req, res) => {
  User.findOne({ googleId: req.body.googleId }).then((currentUser) => {
    if (currentUser) res.send(currentUser);
    else {
      new User({
        name: req.body.name,
        googleId: req.body.googleId,
        profileImageUrl: req.body.imageUrl,
        createdAt: Date.now(),
      })
        .save()
        .then((newUser) => {
          res.send(newUser);
        });
    }
  });
});

export default router;
