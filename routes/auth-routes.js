import express from "express";
import passport from "passport";
import googlePassport from "../config/passport-setup.js";

const CLIENT_HOME_PAGE_URL = process.env.APP_FRONTEND_URL;

const router = express.Router();

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log(req);
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.json({
      message: "User Not Authenticated",
      user: null,
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// AUTH LOGOUT
// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// AUTH WITH GOOGLE
// called to authenticate using Google-oauth2.0
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// CALLBACK ROUTE FOR GOOGLE TO REDIRECT TO
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: CLIENT_HOME_PAGE_URL,
  })
);

export default router;
