import {
  Container,
  Form,
  Row,
  Col,
  Button,
  CloseButton,
} from "react-bootstrap";

function ManagePortfolio() {
  const handleSubmit = () => {};

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="border-bottom mb-3">Portfolio Map</div>
          <div>Portfolio's</div>
          <ul className="list-unstyled" style={{ paddingLeft: 20 }}>
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
                <Button variant="dark" size="sm">
                  Swarnjeet
                </Button>
              </span>
            </li>
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
                <Button variant="outline-dark" size="sm">
                  Manjeet
                </Button>
              </span>
            </li>
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
                <Button variant="outline-dark" size="sm">
                  Satyaveer
                </Button>
              </span>
            </li>
          </ul>
        </Col>
        <Col className="border-right">
          <div className="border-bottom mb-3">
            <Row>
              <Col>Portfolio Scripts</Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search symbol to add"
                />
              </Col>
            </Row>
          </div>
          <Button variant="outline-primary">
            <span className="pr-2">CoalIndia</span> <CloseButton />
          </Button>
          <Button variant="outline-primary">
            <span className="pr-2">TataMotar</span> <CloseButton />
          </Button>
          <Button variant="outline-primary">
            <span className="pr-2">Relience</span> <CloseButton />
          </Button>
          <Button variant="outline-primary">
            <span className="pr-2">20Microne</span> <CloseButton />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ManagePortfolio;
