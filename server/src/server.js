const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { UserService } = require("./use-cases");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Vallah");
})

app.get("/api/users/all", async (_, res) => {
  try {
    const allUsers = await UserService.listAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: { message: err.message } });
  }
})

app.post("/api/users/register", async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: { message: err&&err.message ? err.message : 'unknown error while registrating'} });
  }
})

app.post("/api/users/verifyEmail", async (req, res) => {
  try {
    const email = req.body.email;
    const sixDigitCode = req.body.sixDigitCode;
    const result = await UserService.verifyUserEmail({ email, sixDigitCode });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: { message: err.message } });
  }
})

app.listen(PORT, () => console.log("Server ready at", PORT));
