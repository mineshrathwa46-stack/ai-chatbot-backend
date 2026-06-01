import express from "express";

import {
  loginUser, registerUser,
} from "../controllers/authController.js";

import authMiddleware
from "../middleware/authMiddleware.js";
import {
  chatWithAI,
} from "../controllers/chatController.js";

const router = express.Router();

// login route
router.post(
  "/login",
  loginUser
);
router.post(
  "/register",
    registerUser
);
router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);
// protected route
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      user: req.user,
    });

  }
);

export default router;