const http = require("node:http");
const crypto = require("node:crypto");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const express = require("express");

const { userDb } = require("./db");

dotenv.config();
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }), cors());

app.get("/", (_rq, rs) => rs.send("ok"));

app.post("/signup", async function (req, res) {
  console.log(req.method, req.route.path);
  try {
    const { email, password } = req.body;

    const user = await userDb.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      throw new Error("email already exists");
    }

    const hash = crypto
      .pbkdf2Sync(password, process.env.SALT, 1000, Math.pow(2, 4), "sha512")
      .toString("hex");

    await userDb.insertOne({ email: email.toLowerCase(), password: hash });

    return res.send("sign up successful");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/signin", async function (req, res) {
  console.log(req.method, req.route.path);
  try {
    const { email, password } = req.body;

    const user = await userDb.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      throw new Error("user not found");
    }

    const hash = crypto
      .pbkdf2Sync(password, process.env.SALT, 1000, Math.pow(2, 4), "sha512")
      .toString("hex");

    if (hash !== user.password) {
      throw new Error("Invalid email/password combination");
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.SALT, {
      expiresIn: 600, // 10 mins
    });

    return res.json({
      message: "sign in successful",
      data: {
        id: user._id,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/protected", async function (req, res) {
  console.log(req.method, req.route.path);
  try {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new Error("Unable to authenticate request");
    }

    accessToken = accessToken.replace("Bearer ", "");
    jwt.verify(accessToken, process.env.SALT);

    return res.send("/protected accessed successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/refresh-token", async function (req, res) {
  console.log(req.method, req.route.path);
  try {
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const server = http.createServer(app);

server.listen(process.env.PORT, function () {
  console.log("server running on port", process.env.PORT);
});
