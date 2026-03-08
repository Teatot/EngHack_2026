import { useState } from "react";
import { FileInput } from "../components/FileInput";
import { ResumeCarousel } from "../components/ResumeCarousel";


export const Home = () => {
    // Disable buttons if none selected
    const [fileSelected, setFileSelected] = useState<string>("");
    // Increment to tell ResumeCarousel to refetch (e.g. after upload)
    const [uploadTrigger, setUploadTrigger] = useState(0);

    return (
        <section className="home-main-shell">
            <p>File Name Selected: {fileSelected}</p>
            <ResumeCarousel
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                uploadTrigger={uploadTrigger}
            />
            <FileInput onUploadSuccess={() => setUploadTrigger((t) => t + 1)} />
        </section>
    );
}
