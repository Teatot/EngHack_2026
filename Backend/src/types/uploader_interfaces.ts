export interface SingleUploadMessageStruct {
    message: string;
    filename: string;
    filepath: string;
}

// Interface representing the structure of the response message for a single file upload, including a message, the filename, and the file path
export interface SingleMessage {
    filename: string;
    originalName: string;
    size: number;
    filepath: string;
}

// Interface representing the structure of the response message for multiple file uploads, including a message and an array of SingleMessage objects for each uploaded file
export interface MultipleUploadMessageStruct {
    message: string;
    files: SingleMessage[];
}


// Interface representing the structure of an error response, including an error message
export interface UploadedPdfFile {
    filename: string;
    filepath: string;
}

// Interface representing the structure of an error response, including an error message
export interface GetUploadedFilesResponse {
    files: UploadedPdfFile[];
}
