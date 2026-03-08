import { readdirSync } from "fs";
import { FileListStruct } from "../../types/files_interfaces.js";

// Helper function to read the list of uploaded files from the uploads directory and return it as a structured response
const fileList: FileListStruct = {
    filenames: readdirSync("./uploads")
};
fileList.filenames.forEach((filename, index) => {
    console.log(`${index + 1}: ${filename}`);
});

export default fileList;