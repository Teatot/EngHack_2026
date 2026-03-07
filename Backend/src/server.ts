import "dotenv/config";
import cors from "cors";
import express from "express";
import geminiRouter from "./routes/geminiAPI.route.js";
import uploaderRouter from "./routes/uploader.route.js";
import fileListRouter from "./routes/files.route.js";
import scrapeRouter from "./routes/scrape.route.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Route for Gemini API
app.use("/api/prompt-gemini", geminiRouter);

// Route for Uploader
app.use("/api/uploader", uploaderRouter);

// Route for listing uploaded files
app.use("/api/list-uploads", fileListRouter);

// Route for Scraping result
app.use("/api/scrape", scrapeRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
