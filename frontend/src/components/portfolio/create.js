import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function CreatePortfolio() {
  const [portfolios, setPortfolios] = useState([]);

  const handleSubmit = () => {};
  const handleEditPortfolio = () => {};

  useEffect(() => {
    fetch("/portfolio")
      .then((res) => res.json())
      .then((res) => {
        setPortfolios(res.data);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="border-right">
          <div className="border-bottom mb-3">Create Portfolio</div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control type="text" placeholder="Portfolio Name" />
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <Form.Group controlId="select" className="mb-5">
              <Form.Label>Full Address</Form.Label>
              <Form.Control type="text" placeholder="Full Address" />
            </Form.Group>
            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Creat Portfolio
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <div className="border-bottom mb-3">Portfolio Map</div>
          <div>Portfolio's</div>
          <ul className="list-unstyled" style={{ paddingLeft: 20 }}>
            {portfolios.map((portfolio) => {
              return (
                <li
                  style={{
                    borderLeft: "1px dotted black",
                    paddingLeft: 10,
                    borderBottom: "1px dotted black",
                    height: 40,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      background: "white",
                      transform: "translate(0, 50%)",
                    }}
                  >
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={handleEditPortfolio}
                    >
                      {portfolio.Portfolio}
                    </Button>
                  </span>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col>
          <div className="border-bottom mb-3">Edit Portfolio</div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Portfolio Name"
                value="Swarnjeet"
              />
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                value="Swarnjeet Singh"
              />
            </Form.Group>
            <Form.Group controlId="select" className="mb-5">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Address"
                value="HN - 365, Sarai Khawaja, Faridabad, Haryana - 121003"
              />
            </Form.Group>
            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Update Portfolio
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePortfolio;
