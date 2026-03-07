import { useCallback, useState } from "react";
import "./FileInput.less";
import { uploadPDFs } from "../api/uploaderApi";
import { getFileSizeLabel } from "../helper/util/fileOperations";

export const FileInput = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [result, setResult] = useState<string>("");

    const handleFileChange = useCallback((event: any) => {
        const selectedFiles: File[] = Array.from(event.target.files ?? []);
        setFiles((currentFiles) => [...currentFiles, ...selectedFiles]);
    }, []);

    const handleClearFile = useCallback((indexToRemove: number) => {
        setFiles((currentFiles) => currentFiles.filter((file, index) => index !== indexToRemove));
    }, []);

    const handleUploadFiles = useCallback(async () => {
        try {
            const { error } = await uploadPDFs(files);
            if (error === "failure") {
                console.error("UPLOAD FAILED");
            }
            setResult("Success");
            setFiles([]);
        } catch (err) {
            console.error(err);
        }
    }, [files]);

    return (
        <div className="fileInput__container">
            <h2 className="fileInput__title">Upload Resume</h2>

            <label className="fileInput__dropzone">
                <input className="fileInput__nativeInput" multiple type="file" accept="application/pdf" onClick={() => setResult("")} onChange={handleFileChange} />
                <span className="fileInput__dropzoneText"><strong>Choose files</strong></span>
            </label>

            <div className="fileInput__list">
                {files.map((file, index) => (
                    <div className="fileInput__list__section">
                        <div key={`${file.name}-${index}`}>
                            <p>{file.name}</p>
                            <p>{getFileSizeLabel(file)}</p>
                        </div>
                        <button className="fileInput__removeButton"onClick={() => handleClearFile(index)}>Remove</button>
                    </div>
                ))}
            </div>


            <div className="fileInput__resultList">
                {result ? <p className="fileInput__statusResult">Success</p> : <p></p>}
                <button className="fileInput__submitButton" disabled={!files.length} onClick={handleUploadFiles}>Upload</button>
            </div>
        </div>
    );
};
