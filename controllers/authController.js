import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let users = [];

// REGISTER
export const registerUser =
async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const userExists =
      users.find(
        (user) =>
          user.email === email
      );

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser = {

      email,

      password:
        hashedPassword,

    };

    users.push(newUser);

    // token generate
    const token = jwt.sign(

      {
        email: newUser.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1h",
      }

    );

    res.status(201).json({

      message:
        "User registered successfully",

      token,

      email:
        newUser.email,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error",

    });

  }

};

// LOGIN
export const loginUser =
async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const user =
      users.find(
        (u) => u.email === email
      );

    if (!user) {

      return res.status(401).json({

        message:
          "User does not exist",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({

        message:
          "Invalid password",

      });

    }

    const token = jwt.sign(

      {
        email: user.email,
      },

      "nanu",

      {
        expiresIn: "1h",
      }

    );

    res.status(200).json({

      token,

      email:
        user.email,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error",

    });

  }

};