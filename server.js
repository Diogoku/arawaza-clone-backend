// IMPORTING
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import pkg from "dotenv";

// KEYS
const { config } = pkg;
config();

// IMPORT ROUTES
import authRoutes from "./routes/auth-routes.js";
import profileRoutes from "./routes/profile-routes.js";
import productsRoutes from "./routes/product-routes.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

// DB CONFIG
const connection_url = process.env.DB_URL;
mongoose
  .connect(connection_url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// COOKIES
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_COOKIE],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// BODY PARSER
app.use(bodyParser.json());

// PARSE COOKIES
app.use(cookieParser());

// SET UP CORS TO ALLOW US TO ACCEPT REQUESTS FROM OUR CLIENT
app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// SET UP AUTH ROUTES
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/product", productsRoutes);

// LISTENER
app.listen(port, () => console.log(`Listening on localhost on port ${port}`));
