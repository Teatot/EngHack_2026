export interface SingleUploadMessageStruct {
    message: string;
    filename: string;
    filepath: string;
}

export interface SingleMessage {
    filename: string;
    originalName: string;
    size: number;
    filepath: string;
}

export interface MultipleUploadMessageStruct {
    message: string;
    files: SingleMessage[];
}

export interface UploadedPdfFile {
    filename: string;
    filepath: string;
}

export interface GetUploadedFilesResponse {
    files: UploadedPdfFile[];
}
