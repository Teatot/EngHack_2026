import { useState } from "react";
import { FileInput } from "../components/FileInput";
import { ResumeCarousel } from "../components/ResumeCarousel";

interface HomeProps {
    onAnalyze: (fileName: string) => void;
    loading: boolean;
    fileSelected: string;
    setFileSelected: (fileName: string) => void;
}

// Component representing the home page of the application, allowing users to select a resume, view uploaded resumes in a carousel, and upload new resumes, with appropriate callbacks for analysis and state management
export const Home = ({ onAnalyze, loading, fileSelected, setFileSelected }: HomeProps) => {
    // Increment to tell ResumeCarousel to refetch (e.g. after upload)
    const [uploadTrigger, setUploadTrigger] = useState(0);

    return (
        <section className="home-main-shell">
            <header style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>Analyze Your Fit</h2>
                <p style={{ color: '#64748b' }}>Select a resume to compare with the job description</p>
            </header>

            <ResumeCarousel
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                uploadTrigger={uploadTrigger}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '24px', width: '100%' }}>
                {fileSelected ? (
                    <button
                        onClick={() => onAnalyze(fileSelected)}
                        disabled={loading}
                        className={`nav-button active`}
                        style={{
                            padding: '14px 40px',
                            fontSize: '1.1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            width: '90%',
                            maxWidth: '350px',
                            backgroundColor: '#6366f1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                        }}
                    >
                        {loading ? 'Processing Analysis...' : '🚀 Start Analysis'}
                    </button>
                ) : (
                    <div style={{
                        padding: '12px 24px',
                        background: '#f1f5f9',
                        borderRadius: '12px',
                        color: '#64748b',
                        border: '1px dashed #cbd5e1',
                        width: '90%',
                        textAlign: 'center'
                    }}>
                        Select a resume above to start
                    </div>
                )}

                {fileSelected && (
                    <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>
                        Selected: <span style={{ color: '#6366f1' }}>{fileSelected}</span>
                    </p>
                )}

                <div style={{ marginTop: '8px', width: '100%', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <FileInput onUploadSuccess={() => setUploadTrigger((t) => t + 1)} />
                </div>
            </div>
        </section>
    );
}
