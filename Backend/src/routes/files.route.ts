import { Router } from "express";
import { FileListStruct } from "../types/files_interfaces.js";

const router = Router();

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

router.get("/list-uploads", (req, res) => {
    const successMessage: FileListStruct = {
        filenames: []
    };
    
    return res.status(200).json(successMessage);
});

export default router;