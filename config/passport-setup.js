import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.js";
import pkg from "dotenv";

const { config } = pkg;
config();

// SERIALIZE USER
// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// DESERIALIZE USER
// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      console.log("deserialize User", user);
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

//console.log(process.env);
export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/google/redirect`,
    },
    (accessToken, refreshToken, profile, done) => {
      // find current user in UserModel
      User.findOne({
        googleId: profile.id,
      })
        .then((currentUser) => {
          if (currentUser) {
            //console.log("current user", currentUser);
            done(null, currentUser);
          } else {
            new User({
              name: profile.displayName,
              googleId: profile.id,
              profileImageUrl: profile.photos[0].value,
            })
              .save()
              .then((newUser) => {
                console.log("new user created", newUser);
                done(null, newUser);
              })
              .catch((err) => console.log(err, "erro"));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
