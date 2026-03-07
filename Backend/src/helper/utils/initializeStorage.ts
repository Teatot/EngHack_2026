import multer from "multer";

let count: number = 0;

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads");
    },
    filename(req, file, callback) {
        callback(null, `${count++}-${file.originalname}`);
    },
});

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
