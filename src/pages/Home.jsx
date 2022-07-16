import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function getData() {
      setLoading(true);
      const response = await fetch("http://localhost:4000/articles");
      const data = await response.json();

      if (ignore) return;

      setLoading(false);
      setArticles(data);
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container className="mt-3">
      <Row className="g-3">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          articles.map((article) => (
            <Col lg={4} key={article.id}>
              <Card body>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Home;
