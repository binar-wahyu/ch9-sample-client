import { Card, Row, Col, Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-3">
      <Row className="g-3">
        {[...Array(5)].map((_, index) => (
          <Col lg={4} key={index}>
            <Card body>
              <a href={`/articles/${index + 1}`}>Article {index + 1}</a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
