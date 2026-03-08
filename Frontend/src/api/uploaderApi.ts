export interface UploadedPdfData {
    files: {
        filename: string;
        filepath: string;
    }[];
}

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
