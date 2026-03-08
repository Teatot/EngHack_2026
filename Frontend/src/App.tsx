import { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { BackendResult } from "./types/general_interfaces";
import { Home } from "./pages/Home";
import Result from "./pages/Result";

export default function App() {
  const [response, setResponse] = useState<BackendResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<string>("");
  const navigate = useNavigate();

  async function handleClick(fileName: string) {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/prompt-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "Compare my uploaded pdf resume and the website for the job I'm looking at. Give me a recommendation on how I can be a better match for this job. and provide links to resources I can use.",
          file: fileName
        }),
      });

      if (!res.ok) {
        console.error("Request failed", res.status);
        return;
      }

      const data = (await res.json()) as { result: BackendResult };
      console.log("Backend result:", data.result);
      setResponse(data.result);
      navigate("/result");
    } catch (error) {
      console.error("Error fetching analysis:", error);
    } finally {
      setLoading(false);
    }
  }

  const isAnalysisDisabled = !response || !fileSelected;

  return (
    <section className="app-card">
      <nav className="nav-bar">
        <NavLink to="/" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>Resume Upload</NavLink>
        <NavLink
          to={isAnalysisDisabled ? "#" : "/result"}
          onClick={(e) => isAnalysisDisabled && e.preventDefault()}
          className={({ isActive }) => `nav-button ${isActive ? 'active' : ''} ${isAnalysisDisabled ? 'disabled' : ''}`}
          style={{
            cursor: isAnalysisDisabled ? 'not-allowed' : 'pointer',
            opacity: isAnalysisDisabled ? 0.5 : 1
          }}
        >
          Analysis
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={
          <Home
            onAnalyze={handleClick}
            loading={loading}
            fileSelected={fileSelected}
            setFileSelected={setFileSelected}
          />
        } />
        <Route path="/result" element={<Result data={response} />} />
      </Routes>
    </section>
  );
}