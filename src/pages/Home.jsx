import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="mt-3">
      <Row className="g-3">
        {[...Array(5)].map((_, index) => (
          <Col lg={4} key={index}>
            <Card body>
              <Link to={`/articles/${index + 1}`}>Article {index + 1}</Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
