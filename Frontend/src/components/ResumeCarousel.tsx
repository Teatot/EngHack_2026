import { useEffect, useState } from "react";
import { ResumeCard } from "./ResumeCard";
import { getPDFs, UploadedPdfData } from "../api/uploaderApi";
import "./ResumeCarousel.less";

interface ResumeCarouselProp {
    fileSelected: string;
    setFileSelected: (value: string) => void;
    /** Increment to force refetch (e.g. after new upload). */
    uploadTrigger?: number;
}

export const ResumeCarousel = ({ fileSelected, setFileSelected, uploadTrigger = 0 }: ResumeCarouselProp) => {
    const [ deleteFile, setDeleteFile ] = useState<number>(0);
    const [resumeData, setResumeData] = useState<UploadedPdfData>();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getPDFs();
                setResumeData(data);
            } catch (err) {
                console.error(err);
                return;
            }
        };

        loadData();
    }, [deleteFile, uploadTrigger]);

    if (!resumeData?.files.length) {
        return (
            <section className="resumeCarousel__shell resumeCarousel__shell--empty">
                <p className="resumeCarousel__placeholder">Please add a resume</p>
            </section>
        );
    }

    return (
        <section className="resumeCarousel__shell">
            {resumeData?.files.map((file) => (
                <ResumeCard
                    key={file.filepath}
                    filename={file.filename}
                    filepath={file.filepath}
                    fileSelected={fileSelected}
                    setDeleteFile={setDeleteFile}
                    setFileSelected={setFileSelected}
                />
            ))}
        </section>
    );
};
