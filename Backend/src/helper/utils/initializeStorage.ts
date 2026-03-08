import multer from "multer";

let count: number = 0;

// Multer configuration for handling file uploads, specifying the destination directory and filename format, as well as filtering to only accept PDF files
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads");
    },
    filename(req, file, callback) {
        callback(null, `${count++}-${file.originalname}`);
    },
});

// Multer instance configured with the defined storage and file filter to ensure only PDF files are accepted for upload
export const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== "application/pdf") {
            return callback(new Error("Not a PDF"));
        }

        // Accepts the File
        callback(null, true);
    }
});
