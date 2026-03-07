import cors from "cors";
import express from "express";
import uploaderRouter from "./routes/uploader.route.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

// Route for Uploader
app.use("/api/uploader", uploaderRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
