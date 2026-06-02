import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/firebase.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { email, password,name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!snapshot.empty) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    await db.collection("users").add(newUser);
    // token generate
    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      email: newUser.email,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userDoc = snapshot.docs[0];

    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { email: user.email,
        name: user.name
       },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.status(200).json({
      token,

      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
