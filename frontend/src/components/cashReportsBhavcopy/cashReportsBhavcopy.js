import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import config from "../../config";

function CashReportBhavcopy(props) {
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };
  const [portfolio, setPortfolio] = useState("");
  const [date, setDate] = useState("05/25/2022");
  const [key, setKey] = useState("date");
  const [data, setData] = useState([]);
  const url = `${config.BASE_URL}/cash-reports/bhavcopy`;

  const handleDateChange = (newDate) => {
    setDate(newDate.format("MM/DD/yyyy"));
  };

  const handlePortfolioChange = (value) => {
    setPortfolio(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container fluid>
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="date" title="Specific Date">
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-5">
                <Col>
                  <Form.Group controlId="date">
                    <Form.Label>Select custom date *</Form.Label>
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
                  <Form.Group controlId="select">
                    <Form.Label>Select portfolio</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handlePortfolioChange}
                      value={portfolio}
                    >
                      <option>Select portfolio</option>
                      <option value="1">Swarnjeet</option>
                      <option value="2">Manjeet</option>
                      <option value="3">Favroute</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="select" className="mb-5">
                    <Form.Label>
                      <span className="opacity-zero">Click the button</span>
                    </Form.Label>
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Tab>

          <Tab eventKey="date_range" title="Date Range">
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="date" className="mb-3">
                    <Form.Label>From - To</Form.Label>
                    <DateRangePicker>
                      <input type="text" className="form-control col-4" />
                    </DateRangePicker>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="select" className="mb-5">
                    <Form.Label>Plesae select symbol</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Select symbol</option>
                      <option value="1">Swarnjeet</option>
                      <option value="2">Manjeet</option>
                      <option value="3">Favroute</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="select" className="mb-5">
                    <Form.Label>
                      <span className="opacity-zero">click the button</span>
                    </Form.Label>
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </div>
      <main style={{ overflow: "auto" }}>
        {data.length ? (
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
        ) : (
          <h4 className="text-center">
            Please select the date from date picker menu and submit the form
          </h4>
        )}
      </main>
    </Container>
  );
}

export default CashReportBhavcopy;
