import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Helmet from "helmet";
import connection from "./db/connection.js";
import { rateLimit } from "express-rate-limit";
import requestIp from "request-ip";
//importing the routes from the routes folder
import userRoutes from "./routes/user.routes.js";
//importing team routes
import teamRoutes from "./routes/team.routes.js";
//importing the file routes
import fileRoutes from "./routes/file.routes.js";
import morganMiddleware from "./looger/morgan.logger.js";

//============================================================config the dotenv=========================================================
dotenv.config();
//===============================================connect to the database==================================================================
connection();

//=======================================================create the express app===========================================================
const app = express();
//=============================================apply the cors middleware to the app======================================================
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

//=================================get the real ip address of the user and attach it to the request object================================
app.use(express.json());
app.use(requestIp.mw());

//apply the rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests
//   standardHeaders: true, // include headers
//   legacyHeaders: true, // include X-RateLimit headers
//   keyGenerator: (req, res) => {
//     return req.realIp;
//   },
//   handler: (req, res) => {
//     return res.status(429).json({
//       status: "error",
//       message: "Too many requests, please try again later.",
//     });
//   },
// });
//==============================================apply the middlewares===================================================================
// app.use(limiter);
app.use(Helmet());

// applying the morgan middleware for logging of the requests to the server
app.use(morganMiddleware);

//=====================================================use the routes=====================================================================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/file", fileRoutes);

//================================================create the server=======================================================================
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

