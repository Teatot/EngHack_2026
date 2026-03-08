import { Router } from "express";
import { FileListStruct } from "../types/files_interfaces.js";

const router = Router();

// Health check endpoint to verify that the server is running
router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

// Endpoint to list all uploaded files in the uploads directory, returning the filenames in a structured response format
router.get("/list-uploads", (req, res) => {
    const successMessage: FileListStruct = {
        filenames: []
    };
    
    return res.status(200).json(successMessage);
});

export default router;