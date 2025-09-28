import { useState, useEffect, useMemo } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  // Static language data based on your GitHub stats
  const staticLanguages = useMemo(() => [
    { language: 'Jupyter Notebook', percentage: 80.10 },
    { language: 'TypeScript', percentage: 8.31 },
    { language: 'Ballerina', percentage: 3.61 },
    { language: 'JavaScript', percentage: 2.91 },
    { language: 'C++', percentage: 1.71 },
    { language: 'CMake', percentage: 1.35 },
    { language: 'Python', percentage: 0.88 },
    { language: 'Dart', percentage: 0.57 }
  ], []);

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    // Try to fetch from GitHub API first, fallback to static data
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Sachindu-Nethmin/repos');
        const repos = await response.json();
        
        const languageBytes = {};
        
        // Fetch language statistics for each repo
        for (const repo of repos) {
          if (!repo.private) {
            try {
              const langResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`);
              const langData = await langResponse.json();
              
              Object.entries(langData).forEach(([language, bytes]) => {
                languageBytes[language] = (languageBytes[language] || 0) + bytes;
              });
            } catch (error) {
              console.log(`Error fetching languages for ${repo.name}`);
            }
          }
        }

        const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);
        
        if (totalBytes > 0) {
          let sortedLanguages = Object.entries(languageBytes)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .map(([language, bytes]) => ({ 
              language, 
              bytes,
              percentage: Math.round((bytes / totalBytes) * 100 * 100) / 100 // Round to 2 decimals
            }));

          // Ensure percentages add up to 100%
          const totalPercentage = sortedLanguages.reduce((sum, lang) => sum + lang.percentage, 0);
          if (totalPercentage !== 100 && sortedLanguages.length > 0) {
            const difference = 100 - totalPercentage;
            sortedLanguages[0].percentage += difference;
            sortedLanguages[0].percentage = Math.round(sortedLanguages[0].percentage * 100) / 100;
          }

          setLanguages(sortedLanguages);
        } else {
          // Fallback to static data
          setLanguages(staticLanguages);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data, using static data:', error);
        // Use static data on error
        setLanguages(staticLanguages);
        setLoading(false);
      }
    };

    // Simulate loading for better UX, then load data
    setTimeout(() => {
      fetchLanguages();
    }, 1000);
  }, [staticLanguages]);

  const getLanguageColor = (language) => {
    const colors = {
      'Jupyter Notebook': '#DA5B0B',
      'TypeScript': '#3178C6',
      'Ballerina': '#2bff00ff',
      'JavaScript': '#F7DF1E',
      'C++': '#00599C',
      'CMake': '#064F8C',
      'Python': '#3776AB',
      'Dart': '#0175C2',
      'CSS': '#1572B6',
      'Swift': '#FA7343',
      'HTML': '#E34F26',
      'C': '#A8B9CC',
      'Java': '#ED8B00',
      'PHP': '#777BB4',
      'React': '#61DAFB',
      'C#': '#239120',
      'Go': '#00ADD8',
      'Rust': '#000000'
    };
    return colors[language] || '#888888';
  };

  const PercentageMeter = ({ percentage, color }) => {
    return (
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        margin: '0 auto 20px'
      }}>
        <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="#333"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 35}`}
            strokeDashoffset={`${2 * Math.PI * 35 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.5s ease-in-out'
            }}
          />
        </svg>
        {/* Percentage text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '11px',
          textAlign: 'center'
        }}>
          {percentage}%
        </div>
      </div>
    );
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>My most used programming languages based on GitHub repositories.</p>
                        {loading ? (
                          <div className="loading" style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
                            Loading GitHub stats...
                          </div>
                        ) : (
                          <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            {languages.map((lang, index) => (
                              <div className="item" key={index}>
                                <PercentageMeter 
                                  percentage={lang.percentage} 
                                  color={getLanguageColor(lang.language)} 
                                />
                                <h5 style={{ fontSize: '14px', textAlign: 'center' }}>{lang.language}</h5>
                              </div>
                            ))}
                          </Carousel>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Background decoration" />
    </section>
  )
}