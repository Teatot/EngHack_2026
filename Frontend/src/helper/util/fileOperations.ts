export const getFileSizeLabel = (file: File) => {
    return file ? `${(file.size / 1024).toFixed(1)} KB` : null;
};