import { Router } from "express";
import { upload } from "../helper/utils/initializeStorage.js";
import { ErrorStruct } from "../types/general_interfaces.js";
import { MultipleUploadMessageStruct, SingleMessage, SingleUploadMessageStruct, GetUploadedFileNames } from "../types/uploader_interfaces.js";
import path from "path";
import fs from "fs/promises";

const router = Router();

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

// Single Add
router.post("/upload-pdf", upload.single("pdf"), (req, res) => {
    if (!req.file) {

        const errorMessage: ErrorStruct = { error: "No file uploaded" };
        return res.status(400).json(errorMessage);
    }

    // Success
    const successMessage: SingleUploadMessageStruct = {
        message: "PDF uploaded",
        filename: req.file.filename,
        filepath: req.file.path
    };

    return res.status(200).json(successMessage);
});

// Bulk Add
router.post("/upload-pdfs", upload.array("pdfs", 10), (req, res) => {
    if (!req.files || !Array.isArray(req.files) || !req.files.length) {
        const errorMessage: ErrorStruct = { error: "No file uploaded" };
        return res.status(400).json(errorMessage);
    }

    // Success
    const successMessage: MultipleUploadMessageStruct = {
        message: "PDFs uploaded",
        files: req.files.map((file) => {
            const fileMessage: SingleMessage = {
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
                filepath: file.path
            };

            return fileMessage;
        })
    };

    return res.status(200).json(successMessage);
});

// Bulk Fetch
router.get("/uploaded-pdf-names", async (req, res) => {
    try {
        const directory = path.resolve(process.cwd(), "src/uploads");
        const allFiles = await fs.readdir(directory);

        const fileNames = allFiles.filter((file) => file.endsWith(".pdf"));

        const result: GetUploadedFileNames = { files: fileNames };

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to Fetch Uploaded PDF Names"});
    }
});

export default router;
