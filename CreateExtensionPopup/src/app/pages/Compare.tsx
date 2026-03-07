import { useState } from "react";
import { useNavigate } from "react-router";

export default function Compare() {
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

  const hasKeywords = [
    { name: "JavaScript", improvements: ["Build a React app", "Complete Node.js projects", "Practice algorithms"] },
    { name: "TypeScript", improvements: ["Type-safe React components", "Advanced types project", "API integration with TS"] },
    { name: "Node.js", improvements: ["Express.js API", "Database integration", "Authentication system"] },
    { name: "REST APIs", improvements: ["GraphQL implementation", "API testing tools", "Microservices architecture"] },
    { name: "Git", improvements: ["Git workflows", "Branching strategies", "Code review practices"] },
    { name: "Agile", improvements: ["Scrum master certification", "Kanban projects", "Team leadership"] },
    { name: "Problem Solving", improvements: ["LeetCode challenges", "System design", "Debugging techniques"] },
    { name: "Team Collaboration", improvements: ["Open source contributions", "Mentoring programs", "Cross-functional projects"] }
  ];

  const lackingKeywords = [
    { name: "Python", improvements: ["Data science projects", "Machine learning basics", "Web scraping with Python"] },
    { name: "Machine Learning", improvements: ["TensorFlow tutorials", "Kaggle competitions", "Neural network projects"] },
    { name: "AWS", improvements: ["AWS certification prep", "Serverless architecture", "Cloud deployment projects"] },
    { name: "Docker", improvements: ["Container orchestration", "Docker Compose projects", "CI/CD pipelines"] },
    { name: "Kubernetes", improvements: ["K8s certification", "Microservices deployment", "Service mesh concepts"] },
    { name: "CI/CD", improvements: ["Jenkins pipelines", "GitHub Actions", "Automated testing"] },
    { name: "GraphQL", improvements: ["Apollo Server setup", "Schema design", "Client-side integration"] }
  ];

  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    color: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '900px',
    height: '550px',
    flexShrink: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  };

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
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr 1fr',
    gap: '18px',
    alignItems: 'start',
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
    width: '72%'
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
          {/* Left Section - Have */}
          <section style={haveSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h2 style={sectionTitleStyle}>What You Have</h2>
              <span style={countBadgeStyle}>{hasKeywords.length}</span>
            </div>
            <div>
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
                      <p style={improvementTextStyle}>To further improve your skills:</p>
                      <ul style={improvementListStyle}>
                        {skill.improvements.map((improvement, i) => (
                          <li key={i} style={improvementItemStyle}>
                            <a href="#" style={improvementLinkStyle}>{improvement}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Center - Job Description & Progress */}
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
                      strokeDashoffset: `${2 * Math.PI * 120 * (1 - 0.72)}`,
                      strokeLinecap: 'round',
                      filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.6))',
                      transition: 'stroke-dashoffset 1s ease-in-out'
                    }}
                  />
                </svg>
                <div style={ringContentStyle}>
                  <div style={percentageStyle}>72%</div>
                  <div style={matchTextStyle}>Match</div>
                </div>
              </div>
            </div>

            <div style={progressBarWrapperStyle}>
              <div style={progressBarStyle}>
                <div style={progressFillStyle}></div>
              </div>
            </div>
          </section>

          {/* Right Section - Lack */}
          <section style={lackSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h2 style={sectionTitleStyle}>What's Missing</h2>
              <span style={dangerBadgeStyle}>{lackingKeywords.length}</span>
            </div>
            <div>
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
                      <p style={improvementTextStyle}>To further improve your skills:</p>
                      <ul style={improvementListStyle}>
                        {skill.improvements.map((improvement, i) => (
                          <li key={i} style={improvementItemStyle}>
                            <a href="#" style={improvementLinkStyle}>{improvement}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}