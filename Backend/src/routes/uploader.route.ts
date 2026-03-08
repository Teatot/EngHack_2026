import { Router } from "express";
import { upload } from "../helper/utils/initializeStorage.js";
import { ErrorStruct } from "../types/general_interfaces.js";
import { GetUploadedFilesResponse, MultipleUploadMessageStruct, SingleMessage, SingleUploadMessageStruct, UploadedPdfFile } from "../types/uploader_interfaces.js";
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
router.get("/uploaded-pdf", async (req, res) => {
    try {
        const directory = path.resolve(process.cwd(), "src/uploads");
        const allFiles = await fs.readdir(directory);

        const files: UploadedPdfFile[] = allFiles
            .filter((file) => file.endsWith(".pdf"))
            .map((file) => ({
                filename: file,
                filepath: path.join(directory, file)
            }));

        const result: GetUploadedFilesResponse = { files };

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch uploaded PDFs" });
    }
});

// Bulk Delete
router.delete("/uploaded-pdf", async (req, res) => {
    try {
        const { filepath } = req.body as { filepath?: string };

        if (!filepath) {
            const errorMessage: ErrorStruct = { error: "File path is required" };
            return res.status(400).json(errorMessage);
        }

        const resolvedFilePath = path.resolve(filepath);

        await fs.unlink(resolvedFilePath);

        return res.status(200).json({
            message: "File deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: "Failed to delete file"
        });
    }
});

export default router;
