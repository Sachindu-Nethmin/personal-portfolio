import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/banner.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  
  const toRotate = useMemo(() => ["Game Developer", "Web Developer", "AI/ML Engineer", "Security Engineer"], []);
  const period = 2000;

  useEffect(() => {
    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta, isDeleting, loopNum, toRotate, period])



  return (
    <section className="banner" id="home" style={{ paddingTop: '180px' }}>
      <Container>
        <Row className="aligh-items-center" >
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{` I'm Sachindu Nethmin `} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Game Developer", "Web Developer", "AI/ML Engineer", "Security Engineer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>I am a versatile Game Developer, Web Developer, AI/ML Engineer, and Security Engineer with a passion for creating innovative and impactful digital solutions. My journey combines creativity, technical expertise, and problem-solvin from designing interactive game experiences to building scalable web applications, developing intelligent systems with machine learning, and ensuring secure digital environments. I actively contribute to open-source communities and continuously explore emerging technologies to expand my knowledge and skills.</p>
                  <a href="/cv/Sachindu_Nethmin_CV.pdf" download="Sachindu_Nethmin_CV.pdf">
                    <button>Download CV <ArrowRightCircle size={25} /></button>
                  </a>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
