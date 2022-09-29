import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import Button from "../../molecule/button";
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
  const [date, setDate] = useState("05/25/2022");
  const [count, setCount] = useState(10);
  const [loader, setLoader] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate.format("MM/DD/yyyy"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    fetch(
      `${config.BASE_API_URL}/cash-reports/top?type=${topType}&date=${date}&count=${count}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date *</Form.Label>
              <DateRangePicker
                initialSettings={{
                  singleDatePicker: true,
                  startDate: date,
                }}
                onCallback={handleDateChange}
              >
                <input type="text" className="form-control col-4" />
              </DateRangePicker>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Top type *</Form.Label>
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
              <Form.Control
                type="text"
                placeholder="10"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>
                <span style={{ color: "transparent" }}>button</span>
              </Form.Label>
              <Button
                variant="outline-primary"
                className="w-100"
                isWaiting={loader}
                fill="#0d6efd"
              >
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
              <th style={style}>Symbol</th>
              <th>Series</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Last</th>
              <th>PrevClose</th>
              <th>TotalTradeQty</th>
              <th>TotalTradeVal</th>
              <th>Timestamp</th>
              <th>TotalTrades</th>
              <th>ISIN</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              const {
                Symbol,
                Series,
                Open,
                High,
                Low,
                Close,
                Last,
                PrevClose,
                Profit,
                TotalTradeQuantity,
                TotalTradeValue,
                TotalTrades,
                Timestamp,
                ISIN,
              } = item;

              return (
                <tr key={`${Symbol}${i}`}>
                  <td style={style}>{Symbol}</td>
                  <td>{Series}</td>
                  <td>{Open}</td>
                  <td>{High}</td>
                  <td>{Low}</td>
                  <td>{Close}</td>
                  <td>{Last}</td>
                  <td>{PrevClose}</td>
                  <td>{TotalTradeQuantity}</td>
                  <td>{TotalTradeValue}</td>
                  <td>{Timestamp}</td>
                  <td>{TotalTrades}</td>
                  <td>{ISIN}</td>
                  <td>{Number(Profit).toFixed(2) + "%"}</td>
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
