import "dotenv/config";
import cors from "cors";
import express from "express";
import geminiRouter from "./routes/geminiAPI.route.js";
import uploaderRouter from "./routes/uploader.route.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Route for Gemini API
app.use("/api/prompt-gemini", geminiRouter);

// Route for Uploader
app.use("/api/uploader", uploaderRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
