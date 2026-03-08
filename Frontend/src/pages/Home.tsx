import { useState } from "react";
import { FileInput } from "../components/FileInput";
import { ResumeCarousel } from "../components/ResumeCarousel";


export const Home = () => {
    const [fileSelected, setFileSelected] = useState<string>("");

    return (
        <section className="home-main-shell">
            <p>File Name Selected: {fileSelected}</p>
            <ResumeCarousel
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
            />
            <FileInput/>
        </section>
    );
}
