export interface UploadedPdfData {
    files: {
        filename: string;
        filepath: string;
    }[];
}

// Function to send a POST request to the backend API to upload a single PDF file, including the file in the request body as FormData, and return a success or failure message based on the response
export const uploadPDF = async (file: File | null) => {
    if (!file) {
        return { error: "failure" };
    }
    try {
        const data = new FormData();
        data.append("pdf", file);

        const response = await fetch("http://localhost:3000/api/uploader/upload-pdf", {
            method: "POST", 
            body: data
        });

        const result = await response.json();

        return { error: "success" };
    } catch (err) {
        console.error(err);
        return { error: "failure" };
    }
};

// Function to send a POST request to the backend API to upload multiple PDF files, including the files in the request body as FormData, and return a success or failure message based on the response
export const uploadPDFs = async (files: File[]) => {
    if (!files || !files.length) {
        return { error: "failure" };
    }
    try {
        const data = new FormData();

        files.forEach((file) => {
            data.append("pdfs", file);
        });

        const response = await fetch("http://localhost:3000/api/uploader/upload-pdfs", {
            method: "POST",
            body: data
        });

        const result = await response.json();
        return { error: "success" };
    } catch (err) {
        console.error(err);
        return { error: "failure" };
    }
}

// Function to send a DELETE request to the backend API to remove a PDF file, including the file path in the request body, and return a success or failure message based on the response
export const removePDF = async (filepath: string) => {
    try {
        const response = await fetch("http://localhost:3000/api/uploader/uploaded-pdf", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                filepath
            })
        });
        return { error: "success" };
    } catch (err) {
        console.error(err);
        return { error: "failure" };
    }
};

// Function to fetch the list of uploaded PDFs from the backend API and return the structured response, or throw an error if the request fails
export const getPDFs = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/uploader/uploaded-pdf", {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch PDFs");
        }

        const result: UploadedPdfData = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
