import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { useState } from "react";
import config from "../../config";

function GainersLoosers(props) {
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };
  const [data, setData] = useState([]);
  const [topType, setTopType] = useState("Gainers");
  const url = `${config.BASE_URL}/cash-reports/top?type=${topType}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <DateRangePicker
                initialSettings={{
                  singleDatePicker: true,
                  locale: {
                    format: "DD/MM/yyyy",
                  },
                }}
              >
                <input type="text" className="form-control col-4" />
              </DateRangePicker>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Top type</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                value={topType}
                onChange={(event) => setTopType(event.target.value)}
              >
                <option value="gainers">Gainers</option>
                <option value="loosers">Loosers</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Top count</Form.Label>
              <Form.Control type="text" placeholder="10" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>
                <span style={{ color: "transparent" }}>button</span>
              </Form.Label>
              <Button variant="outline-primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <main>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={style}>SYMBOL</th>
              <th>SERIES</th>
              <th>OPEN</th>
              <th>HIGH</th>
              <th>LOW</th>
              <th>CLOSE</th>
              <th>LAST</th>
              <th>PREVCLOSE</th>
              <th>TOTTRDQTY</th>
              <th>TOTTRDVAL</th>
              <th>TIMESTAMP</th>
              <th>TOTALTRADES</th>
              <th>ISIN</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              const {
                SYMBOL,
                SERIES,
                OPEN,
                HIGH,
                LOW,
                CLOSE,
                LAST,
                PREVCLOSE,
                TOTTRDQTY,
                TOTTRDVAL,
                TIMESTAMP,
                TOTALTRADES,
                ISIN,
              } = item;

              return (
                <tr key={`${SYMBOL}${i}`}>
                  <td style={style}>{SYMBOL}</td>
                  <td>{SERIES}</td>
                  <td>{OPEN}</td>
                  <td>{HIGH}</td>
                  <td>{LOW}</td>
                  <td>{CLOSE}</td>
                  <td>{LAST}</td>
                  <td>{PREVCLOSE}</td>
                  <td>{TOTTRDQTY}</td>
                  <td>{TOTTRDVAL}</td>
                  <td>{TIMESTAMP}</td>
                  <td>{TOTALTRADES}</td>
                  <td>{ISIN}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </main>
    </>
  );
}

export default GainersLoosers;
