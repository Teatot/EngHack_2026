import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

router.post("/send", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

export default router;

