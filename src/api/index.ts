import express from "express";
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  return res.json({
    message: "API V1",
  });
});

export default router;
