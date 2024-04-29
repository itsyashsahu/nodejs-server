import express from "express";
import MessageResponse from "../interfaces/MessageResponse";
import characterRouter from "./characters"

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  return res.json({
    message: "API V1",
  });
});

router.use("/characters",characterRouter)

export default router;
