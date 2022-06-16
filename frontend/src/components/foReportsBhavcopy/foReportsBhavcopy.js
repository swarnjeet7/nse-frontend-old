import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

function FoReportsBhavcopy(props) {
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };
  const [portfolio, setPortfolio] = useState("");
  const [date, setDate] = useState("05/25/2022");
  const [data, setData] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate.format("MM/DD/yyyy"));
  };

  const handlePortfolioChange = (value) => {
    setPortfolio(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/fo-reports/bhavcopy")
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
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Select date *</Form.Label>
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
              <Form.Group controlId="date">
                <Form.Label>Select expire date *</Form.Label>
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    startDate: "06-29-2022",
                  }}
                  onCallback={handleDateChange}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="select">
                <Form.Label>Select symbol</Form.Label>
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
      </div>
      <main style={{ overflow: "auto" }}>
        {data.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={style}>Instrument</th>
                <th>Symbol</th>
                <th>ExpireDate</th>
                <th>StrikePR</th>
                <th>OptionType</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>SettlePR</th>
                <th>Contracts</th>
                <th>ValueInLakh</th>
                <th>OpenInt</th>
                <th>ChangeInOI</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                const {
                  Instrument,
                  Symbol,
                  ExpireDate,
                  StrikePR,
                  OptionType,
                  Open,
                  High,
                  Low,
                  Close,
                  SettlePR,
                  Contracts,
                  ValueInLakh,
                  OpenInt,
                  ChangeInOI,
                  Timestamp,
                } = item;

                return (
                  <tr key={`${Symbol}${i}`}>
                    <td style={style}>{Instrument}</td>
                    <td>{Symbol}</td>
                    <td>{ExpireDate}</td>
                    <td>{StrikePR}</td>
                    <td>{OptionType}</td>
                    <td>{Open}</td>
                    <td>{High}</td>
                    <td>{Low}</td>
                    <td>{Close}</td>
                    <td>{SettlePR}</td>
                    <td>{Contracts}</td>
                    <td>{ValueInLakh}</td>
                    <td>{OpenInt}</td>
                    <td>{ChangeInOI}</td>
                    <td>{Timestamp}</td>
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

export default FoReportsBhavcopy;
