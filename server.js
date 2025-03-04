const express = require("express");
const app = express();
const User = require("./user-model");

const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to the homepage");
});

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email cannot be empty" });
    } else if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password cannot be empty" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding new user",
      details: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email cannot be empty" });
    } else if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password cannot be empty" });
    }
    const userCreated = await User.create({
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: userCreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding new user",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
