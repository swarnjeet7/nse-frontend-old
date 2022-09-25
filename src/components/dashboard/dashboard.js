import { Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className="main-layout h-100">
      <Row>
        <Col sm={9}>
          <main>
            <h3 className="mt-5">
              Welcome to the NSE Stock Analysis Dashboard
            </h3>
          </main>
        </Col>
      </Row>
    </div>
  );
}
