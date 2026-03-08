import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendResult } from "../types/general_interfaces";

interface ResultProps {
    data: BackendResult | null;
}

// Component representing the result page of the application, displaying the analysis results of a resume against a job description, including match score, keywords present and missing, and recommendations for improvement, with interactive elements for viewing skill details and resources
export default function Result({ data }: ResultProps) {
    const navigate = useNavigate();
    const [openSkills, setOpenSkills] = useState<Set<string>>(new Set());

    const toggleSkill = (skill: string) => {
        const newOpenSkills = new Set(openSkills);
        if (newOpenSkills.has(skill)) {
            newOpenSkills.delete(skill);
        } else {
            newOpenSkills.add(skill);
        }
        setOpenSkills(newOpenSkills);
    };

    if (!data) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                textAlign: 'center',
                padding: '20px',
                color: '#64748b'
            }}>
                <h2 style={{ marginBottom: '12px' }}>No Analysis Available</h2>
                <p>Please upload and select a resume on the home page to run an analysis.</p>
                <button
                    onClick={() => navigate('/')}
                    className="nav-button active"
                    style={{ marginTop: '20px', backgroundColor: '#6366f1', color: 'white' }}
                >
                    Go to Upload
                </button>
            </div>
        );
    }

    const hasKeywords = data.have || [];
    const lackingKeywords = data.missing || [];
    const matchScore = data.matchScore ?? 0;

    // The recommendation text from the analysis results, or a default message if no recommendation is provided
    const containerStyle: React.CSSProperties = {
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '650px',
        height: '600px',
        flexShrink: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    };

    // The recommendation text from the analysis results, or a default message if no recommendation is provided
    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 30px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        background: 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    };

    // The style for the back button in the header, including background, border, size, and hover effects
    const backBtnStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#333',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        margin: '0',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '28px',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center',
        flex: 1
    };

    const mainContentStyle: React.CSSProperties = {
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const layoutWrapperStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1
    };

    const sectionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    };

    const haveSectionStyle: React.CSSProperties = {
        ...sectionStyle,
        background: 'linear-gradient(135deg, #e8f5f0 0%, #d4edda 100%)',
        border: '1px solid rgba(40, 167, 69, 0.2)'
    };

    const lackSectionStyle: React.CSSProperties = {
        ...sectionStyle,
        background: 'linear-gradient(135deg, #fff3f1 0%, #f8d7da 100%)',
        border: '1px solid rgba(220, 53, 69, 0.2)'
    };

    const centerSectionStyle: React.CSSProperties = {
        ...sectionStyle,
        background: 'linear-gradient(135deg, #f8f9ff 0%, #eff2ff 100%)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        alignItems: 'center',
        gap: '16px'
    };

    const sectionHeaderStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: 600,
        color: '#333'
    };

    const countBadgeStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600
    };

    const dangerBadgeStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600
    };

    const progressRingStyle: React.CSSProperties = {
        position: 'relative',
        width: '260px',
        height: '260px'
    };

    const ringContentStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '85%'
    };

    const percentageStyle: React.CSSProperties = {
        fontSize: '36px',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1
    };

    const matchTextStyle: React.CSSProperties = {
        fontSize: '14px',
        color: '#7a8fde',
        fontWeight: 500,
        marginTop: '4px'
    };

    const progressBarWrapperStyle: React.CSSProperties = {
        width: '100%'
    };

    const progressBarStyle: React.CSSProperties = {
        width: '100%',
        height: '6px',
        background: 'rgba(102, 126, 234, 0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
    };

    const progressFillStyle: React.CSSProperties = {
        height: '100%',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        transition: 'width 1s ease-in-out',
        boxShadow: '0 0 12px rgba(102, 126, 234, 0.5)',
        width: `${matchScore}%`
    };

    const skillDetailStyle: React.CSSProperties = {
        marginBottom: '8px'
    };

    const skillTagStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #e8f5f0 0%, #d4edda 100%)',
        color: '#28a745',
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        border: '1px solid rgba(40, 167, 69, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'block',
        width: '100%',
        textAlign: 'left'
    };

    const dangerSkillTagStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, #fff3f1 0%, #f8d7da 100%)',
        color: '#dc3545',
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        border: '1px solid rgba(220, 53, 69, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'block',
        width: '100%',
        textAlign: 'left'
    };

    const improvementContentStyle: React.CSSProperties = {
        marginTop: '8px',
        padding: '8px 12px',
        background: 'rgba(102, 126, 234, 0.05)',
        borderRadius: '8px',
        borderLeft: '3px solid #667eea'
    };

    const improvementTextStyle: React.CSSProperties = {
        fontSize: '12px',
        fontWeight: 600,
        color: '#333',
        marginBottom: '6px'
    };

    const improvementListStyle: React.CSSProperties = {
        margin: 0,
        paddingLeft: '16px'
    };

    const improvementItemStyle: React.CSSProperties = {
        fontSize: '11px',
        marginBottom: '4px'
    };

    const improvementLinkStyle: React.CSSProperties = {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: 500
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <header style={headerStyle}>
                <button
                    style={backBtnStyle}
                    onClick={() => navigate('/')}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    ←
                </button>
                <h1 style={titleStyle}>Job Match Analysis</h1>
                <button
                    style={backBtnStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    ⋮
                </button>
            </header>

            {/* Main Content */}
            <main style={mainContentStyle}>
                <div style={layoutWrapperStyle}>
                    {/* Progress Section (Top) */}
                    <section style={centerSectionStyle}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                            <div style={progressRingStyle}>
                                <svg viewBox="0 0 260 260">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="130" cy="130" r="120" style={{ fill: 'none', stroke: '#e0e0e0', strokeWidth: '8' }} />
                                    <circle
                                        cx="130"
                                        cy="130"
                                        r="120"
                                        style={{
                                            fill: 'none',
                                            stroke: 'url(#gradient)',
                                            strokeWidth: '8',
                                            strokeDasharray: `${2 * Math.PI * 120}`,
                                            strokeDashoffset: `${2 * Math.PI * 120 * (1 - matchScore / 100)}`,
                                            strokeLinecap: 'round',
                                            filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.6))',
                                            transition: 'stroke-dashoffset 1s ease-in-out'
                                        }}
                                    />
                                </svg>
                                <div style={ringContentStyle}>
                                    <div style={percentageStyle}>{matchScore}%</div>
                                    <div style={matchTextStyle}>Match</div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            textAlign: 'center',
                            padding: '16px 24px',
                            color: '#475569',
                            fontSize: '15px',
                            fontStyle: 'italic',
                            background: 'rgba(99, 102, 241, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(99, 102, 241, 0.1)',
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.02)',
                            margin: '0 10px',
                            lineHeight: '1.5'
                        }}>
                            {data.recommendation}
                        </div>

                        <div style={progressBarWrapperStyle}>
                            <div style={progressBarStyle}>
                                <div style={progressFillStyle}></div>
                            </div>
                        </div>
                    </section>

                    {/* Have Section */}
                    {hasKeywords.length > 0 && (
                        <section style={haveSectionStyle}>
                            <div style={sectionHeaderStyle}>
                                <h2 style={sectionTitleStyle}>What You Have</h2>
                                <span style={countBadgeStyle}>{hasKeywords.length}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {hasKeywords.map((skill, index) => (
                                    <div key={index} style={skillDetailStyle}>
                                        <button
                                            style={skillTagStyle}
                                            onClick={() => toggleSkill(skill.name)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                                            }}
                                        >
                                            {skill.name}
                                        </button>
                                        {openSkills.has(skill.name) && (
                                            <div style={improvementContentStyle}>
                                                <p style={improvementTextStyle}>Details & Resources:</p>
                                                <ul style={improvementListStyle}>
                                                    {skill.improvements.map((improvement, i) => (
                                                        <li key={i} style={improvementItemStyle}>
                                                            <a href={improvement.link} target="_blank" rel="noopener noreferrer" style={improvementLinkStyle}>
                                                                {improvement.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Lack Section */}
                    {lackingKeywords.length > 0 && (
                        <section style={lackSectionStyle}>
                            <div style={sectionHeaderStyle}>
                                <h2 style={sectionTitleStyle}>What's Missing</h2>
                                <span style={dangerBadgeStyle}>{lackingKeywords.length}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {lackingKeywords.map((skill, index) => (
                                    <div key={index} style={skillDetailStyle}>
                                        <button
                                            style={dangerSkillTagStyle}
                                            onClick={() => toggleSkill(skill.name)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                                            }}
                                        >
                                            {skill.name}
                                        </button>
                                        {openSkills.has(skill.name) && (
                                            <div style={improvementContentStyle}>
                                                <p style={improvementTextStyle}>How to gain this skill:</p>
                                                <ul style={improvementListStyle}>
                                                    {skill.improvements.map((improvement, i) => (
                                                        <li key={i} style={improvementItemStyle}>
                                                            <a href={improvement.link} target="_blank" rel="noopener noreferrer" style={improvementLinkStyle}>
                                                                {improvement.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}