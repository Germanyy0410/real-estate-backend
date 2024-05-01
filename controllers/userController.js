const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const bcryptSalt = bcrypt.genSaltSync(12);
const secretKey =
  process.env.JWT_SECRET_KEY || "grab-engineering-bootcamp-team11";

// Route for user registration
exports.register = async (req, res) => {
  const { email, password, fullname, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      email,
      password: hashedPassword,
      fullname,
      phone,
      address,
    });
    res.status(201).json(userDoc);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering user" });
  }
};

// Route for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found, please try again!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ message: "Password is incorrect, please try again!" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        fullname: user.fullname,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    res.cookie(
      "token",
      token,
      { httpOnly: true }.json({ message: "Login successful", token })
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

exports.getProfile = async (req, res) => {
  //TODO:
};

exports.updateProfile = async (req, res) => {
  //TODO:
};

exports.deleteProfile = async (req, res) => {
  //TODO:
};
