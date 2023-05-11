import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js"
import cookieParser from "cookie-parser";
// import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

config({
    path: "./config/config.env",
});

const buildPath = path.join(__dirname, "../coursebundler/build")


const app = express();

app.use(express.static(buildPath));

app.use(express.static('static'));

// Using Middlewares

app.use(express.json());
app.use(express.urlencoded(
    { extended: true, }
));

app.use(cookieParser());

// app.use(
//     cors({
//         origin: process.env.FRONTEND_URL,
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     })
// );


import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";


app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1/", other)


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../coursebundler/build/index.html'), 
    function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  });

export default app;

app.use(ErrorMiddleware);
 