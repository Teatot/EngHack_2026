import { useNavigate } from "react-router";
import { ArrowLeft, FileText, Upload, Edit3, Trash2, GitCompare } from "lucide-react";
import { useState } from "react";

export default function ResumeDetail() {
  const navigate = useNavigate();
  const [resume, setResume] = useState<string | null>(sessionStorage.getItem('resume'));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file.name);
      sessionStorage.setItem('resume', file.name);
    }
  };

  const handleDeleteResume = () => {
    setResume(null);
    sessionStorage.removeItem('resume');
    navigate('/');
  };

  return (
    <div className="w-[420px] bg-background text-foreground flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <button
          onClick={() => navigate('/')}
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Resume Management</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {resume ? (
          <>
            <div className="flex items-center gap-3 p-5 bg-secondary rounded-lg border border-border">
              <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Current Resume</p>
                <p className="text-base font-medium truncate">{resume}</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer">
                <Edit3 className="w-5 h-5" />
                Change Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <button
                onClick={handleDeleteResume}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Delete Resume
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
              <p className="font-medium mb-2">Supported Formats</p>
              <ul className="text-xs space-y-1">
                <li>• PDF (.pdf)</li>
                <li>• Word Document (.doc, .docx)</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent transition-colors w-full">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <span className="text-base font-medium text-muted-foreground">Upload your resume</span>
              <span className="text-sm text-muted-foreground mt-1">PDF, DOC, or DOCX file</span>
              <input
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
