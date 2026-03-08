import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";

const router = Router();

// Health check endpoint to verify that the server is running
router.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

// Endpoint to receive scraped data as JSON in the request body, save it to a new file in the scraped directory with a timestamped filename, and return a success response with the filename or an error message if the operation fails
router.post("/send", async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No scrape data provided",
      });
    }

    const scrapedDir = path.join("src", "scraped");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `scrape-${timestamp}.json`;
    const filePath = path.join(scrapedDir, filename);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return res.status(200).json({
      success: true,
      file: filename,
    });
  } catch (error) {
    console.error("Failed to save scrape data:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save scrape data",
    });
  }
});

export default router;

