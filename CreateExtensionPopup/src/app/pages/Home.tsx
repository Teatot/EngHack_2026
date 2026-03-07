import { useState } from "react";
import { useNavigate } from "react-router";
import { GitCompare, Globe, FileText, Upload, Edit3, Trash2, CheckCircle2, XCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null);
  const [webpageStored, setWebpageStored] = useState<boolean | null>(null);
  const [webpageUrl, setWebpageUrl] = useState<string>("");
  const [hasStoredWebpage, setHasStoredWebpage] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
      sessionStorage.setItem('resume', file.name);
    }
  };

  const handleDeleteResume = () => {
    setResume(null);
    sessionStorage.removeItem('resume');
  };

  const handleAnalyze = () => {
    // Simulate analyzing the webpage
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      const mockUrl = "linkedin.com/jobs/view/123456";
      setWebpageUrl(mockUrl);
      setWebpageStored(true);
      setHasStoredWebpage(true);
      sessionStorage.setItem('webpage', mockUrl);
    } else {
      setWebpageStored(false);
      setHasStoredWebpage(false);
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setWebpageStored(null);
    }, 3000);
  };

  const handleCompare = () => {
    if (resume && hasStoredWebpage) {
      navigate('/compare');
    }
  };

  const canCompare = resume && hasStoredWebpage;

  return (
    <div className="w-[420px] bg-background text-foreground flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GitCompare className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Resume Compare</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Analyze Section */}
        <div className="px-6 py-6 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Analyze Webpage</h2>
          <button
            onClick={handleAnalyze}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Globe className="w-5 h-5" />
            Analyze this Webpage
          </button>
          
          {/* Status Message */}
          {webpageStored !== null && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                webpageStored
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {webpageStored ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900">Webpage analyzed successfully</p>
                    <p className="text-xs text-green-700 truncate">{webpageUrl}</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm font-medium text-red-900">Analysis failed. Try again.</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Resume Section */}
        <div className="px-6 py-6 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
          {resume ? (
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border">
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <button
                onClick={() => navigate('/resume')}
                className="flex-1 text-left truncate text-sm font-medium hover:text-primary transition-colors"
              >
                {resume.name}
              </button>
              <div className="flex items-center gap-1">
                <label
                  className="p-2 hover:bg-background rounded transition-colors cursor-pointer group relative"
                  title="Change resume"
                >
                  <Edit3 className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Change
                  </span>
                </label>
                <button
                  onClick={handleDeleteResume}
                  className="p-2 hover:bg-background rounded transition-colors group relative"
                  title="Delete resume"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm font-medium text-muted-foreground">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground">PDF, DOC, or DOCX</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        {/* Autofill Section */}
        <div className="px-6 py-6">
          <h2 className="text-lg font-semibold mb-4">Compare Resume</h2>
          <button
            onClick={handleCompare}
            disabled={!canCompare}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border relative group ${
              canCompare
                ? "bg-primary text-primary-foreground border-primary hover:bg-background hover:text-primary hover:border-primary"
                : "bg-secondary text-secondary-foreground border-border opacity-50 cursor-not-allowed"
            }`}
          >
            <GitCompare className="w-5 h-5" />
            Compare with Webpage
            {!canCompare && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-border">
                {!resume ? "Upload a resume first" : "Analyze a webpage first"}
              </span>
            )}
          </button>
          <p className="mt-4 text-sm text-muted-foreground">
            Once you've uploaded your resume and analyzed a job posting, click Compare to see how well your qualifications match the role.
          </p>
        </div>
      </div>
    </div>
  );
}