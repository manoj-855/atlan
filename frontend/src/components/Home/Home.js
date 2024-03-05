
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Helmet } from "react-helmet";
import HomeImage from "../../assets/img/AImodel-1.webp";

const Home = () => {
  const navigate = useNavigate();
  const navigateToExplore = () => {
    navigate("/explore");
  };
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Homepage " />
      </Helmet>
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <div className="left">
                <h2>AI model: what does it mean and what does it do?</h2>
                <p>
                AI models are gradually becoming more valuable in practically every industry due to their 
                versatility in problem-solving.  An AI model is, in the most straightforward words, 
                a software or algorithm that uses a specific data set to enable it to conclude without the 
                involvement of a human decision-maker.
                </p>
                <button className="tagline" onClick={navigateToExplore}>
                  Get Started <ArrowRightCircle size={25} loading="lazy" />
                </button>
              </div>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <img src={HomeImage} alt="Header Img" loading="lazy" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Home;
