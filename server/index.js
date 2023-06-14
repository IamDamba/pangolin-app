// ------ Dependences ------
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

const authRouter = require("./routes/auth.route");
const pangolinRouter = require("./routes/pangolin.route");
const friendsRouter = require("./routes/friends.route");

// ------ Middlewares ------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------ Routes ------

app.use("/api/auth", authRouter);
app.use("/api/pangolin", pangolinRouter);
app.use("/api/friends", friendsRouter);

// ------ Listen ------

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
