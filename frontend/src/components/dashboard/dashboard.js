import { Row, Alert, Col } from "react-bootstrap";
import moment from "moment";

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
        <Col>
          <aside>
            <Alert variant="warning">
              Date: {moment().format("DD MMM yyyy")}
            </Alert>
            <Alert variant="success">Top Gainer: TATAMOTERS</Alert>
            <Alert variant="danger">Top Loosers: Airete</Alert>
          </aside>
        </Col>
      </Row>
    </div>
  );
}
