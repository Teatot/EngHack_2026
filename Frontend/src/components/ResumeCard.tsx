import { useCallback } from "react";
import { removePDF } from "../api/uploaderApi";
import "./ResumeCard.less";

interface ResumeCardProp {
    filename: string;
    filepath: string;
    fileSelected: string;
    setDeleteFile: any;
    setFileSelected: any;
}

export const ResumeCard = ({
    filename,
    filepath,
    fileSelected,
    setDeleteFile,
    setFileSelected
}: ResumeCardProp) => {
    const isSelected = fileSelected === filename;

    const handleOpenFile = useCallback(() => {
        window.open(`http://localhost:3000/uploads/${filename}`, "_blank");
    }, [filename]);

    const handleDeleteFile = useCallback(async () => {
        const result = await removePDF(filepath);

        if (result.error === "success") {
            setDeleteFile((currentValue: number) => currentValue + 1);
            if (isSelected) {
                setFileSelected("");
            }
        }
    }, [filepath, isSelected, setDeleteFile, setFileSelected]);

    return (
        <div className="resumeCard__container">
            <div className="resumeCard__titleContainer">
                <p className="resumeCard__title">{filename.slice(2)}</p>
                <button className="resumeCard__deleteButton" onClick={handleDeleteFile}>Delete</button>
            </div>
            <div className="resumeCard__buttonContainer">
                <button
                    className={`resumeCard__selectButton ${isSelected ? "resumeCard__selectButton--selected" : ""}`}
                    disabled={isSelected}
                    onClick={() => setFileSelected(filename)}
                >
                    {isSelected ? "Selected" : "Select"}
                </button>
                <button className="resumeCard__viewButton" onClick={handleOpenFile}>View</button>
            </div>
        </div>
    );
};
