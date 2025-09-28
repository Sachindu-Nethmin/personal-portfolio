import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/game/Rival.png";
import projImg2 from "../assets/img/game/Trigger.png";
import projImg3 from "../assets/img/game/Runner of the maze.png";
import projImg4 from "../assets/img/game/Grow in the Dark.png";
import projImg5 from "../assets/img/game/Runner.png";
import projImg6 from "../assets/img/game/Last Hope.png";
import projImg7 from "../assets/img/AI/sleep detection.png";
import projImg8 from "../assets/img/AI/karathe.png";
import projImg9 from "../assets/img/AI/Person .png";
import projImg10 from "../assets/img/AI/Vesak.png";
import projImg11 from "../assets/img/AI/Q&A.png";
import projImg12 from "../assets/img/AI/Chat.png";
import projImg13 from "../assets/img/web/Ballrina news Website.png";
import projImg14 from "../assets/img/web/MaterialQuiz.png";
import projImg15 from "../assets/img/web/RavinduHeshan.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const games = [
    {
      title: "Rivals",
      description: "Game Development",
      imgUrl: projImg1,
    },
    {
      title: "Runner of the maze",
      description: "Game Development",
      imgUrl: projImg2,
    },
    {
      title: "Trigger",
      description: "Game Development",
      imgUrl: projImg3,
    },
    {
      title: "Grow in the Dark",
      description: "Game Development",
      imgUrl: projImg4,
    },
    {
      title: "Runner",
      description: "Game Development",
      imgUrl: projImg5,
    },
    {
      title: "Last Hope",
      description: "Game Development",
      imgUrl: projImg6,
    },
  ];
  const AIs = [
    {
      title: "Sleep detection",
      description: "AI Development",
      imgUrl: projImg7,
    },
    {
      title: "Karathe player detection",
      description: "AI Development",
      imgUrl: projImg8,
    },
    {
      title: "Person detection",
      description: "AI Development",
      imgUrl: projImg9,
    },
    {
      title: "Vesak email wish genaration",
      description: "AI Development",
      imgUrl: projImg10,
    },
    {
      title: "Q&A genaration according to leture materials",
      description: "AI Development",
      imgUrl: projImg11,
    },
    {
      title: "Chat bot",
      description: "AI Development",
      imgUrl: projImg12,
    },
  ];
  const web = [
    {
      title: "Ballrina news Website",
      description: "Web Development",
      imgUrl: projImg13,
    },
    {
      title: "MaterialQuiz web",
      description: "Web Development",
      imgUrl: projImg14,
    },
    {
      title: "Ravindu's web",
      description: "Web Development",
      imgUrl: projImg15,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Game Development</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Artificial Intelligence</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Web development</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          games.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          AIs.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          web.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  )
}
