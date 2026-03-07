import { readdirSync } from "fs";
import { FileListStruct } from "../../types/files_interfaces.js";

const fileList: FileListStruct = {
    filenames: readdirSync("./uploads")
};
fileList.filenames.forEach((filename, index) => {
    console.log(`${index + 1}: ${filename}`);
});

export default fileList;