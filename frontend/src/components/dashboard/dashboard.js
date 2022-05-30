import { Row, Alert, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="main-layout h-100">
      <Row>
        <Col sm={9}>
          <main>
            <h1>Welcome to the NSE Stock Analysis Dashboard</h1>
          </main>
        </Col>
        <Col>
          <aside>
            <Link to="/top-gainers-loosers">
              <Alert variant="success">Top Gainer: TATAMOTERS</Alert>
            </Link>
            <Link to="/top-gainers-loosers">
              <Alert variant="danger">Top Loosers: Airete</Alert>
            </Link>
          </aside>
        </Col>
      </Row>
    </div>
  );
}
