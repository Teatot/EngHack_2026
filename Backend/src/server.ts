import "dotenv/config"; // loads .env into process.env

import cors from "cors";
import express from "express";
import { sendRequest, type Data } from "./aiHandler.js"; // note the .js extension
import uploaderRouter from "./routes/uploader.route.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// ... add this route ...
app.post("/api/prompt-gemini", async (req, res) => {
  try {
    const body = req.body as Data;
    const result = await sendRequest(body);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to run main()" });
  }
});

// Route for Uploader
app.use("/api/uploader", uploaderRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

