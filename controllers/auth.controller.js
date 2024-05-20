import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const bcryptSalt = bcrypt.genSaltSync(12);
const secretKey =
  process.env.JWT_SECRET_KEY || "grab-engineering-bootcamp-team11";

export const register = async (req, res) => {
  const { email, password, username, address, phone } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        phone,
        address,
      },
    });

    console.log(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please try again!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
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

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in", error: error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
