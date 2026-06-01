import "./config/env.js";
import express from "express";
import cors from "cors";

import authRoutes
from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// all routes
app.use(
  "/api",
  authRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});