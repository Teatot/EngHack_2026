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