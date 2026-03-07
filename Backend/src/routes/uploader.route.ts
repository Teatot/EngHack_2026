import { Router } from "express";
import { upload } from "../helper/utils/initializeStorage.js";
import { ErrorStruct } from "../types/general_interfaces.js";
import { UploadMessageStruct } from "../types/uploader_interfaces.js";

const router = Router();

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

router.post("/upload-pdf", upload.single("pdf"), (req, res) => {
    if (!req.file) {

        const errorMessage: ErrorStruct = { error: "No file uploaded" };
        return res.status(400).json(errorMessage);
    }

    // Success
    const successMessage: UploadMessageStruct = {
        message: "PDF uploaded",
        filename: req.file.filename,
        filepath: req.file.path
    };
    
    return res.status(200).json(successMessage);
});

export default router;