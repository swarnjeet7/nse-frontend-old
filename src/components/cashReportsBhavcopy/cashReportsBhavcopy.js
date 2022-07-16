import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Button, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Loader from "../loader";
import moment from "moment";
import _ from "lodash";

function CashReportBhavcopy(props) {
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };
  const [form, setForm] = useState({
    from: "05/23/2022",
    Portfolio: "",
    Symbol: "",
  });
  const [Portfolios, setPortfolios] = useState([]);
  const [Symbols, setSymbols] = useState([]);
  const [key, setKey] = useState("date");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const DEFAULT_PORTFOLIO_VALUE = "Select portfolio";
  const DEFAULT_SYMBOL_VALUE = "Select symbol";

  useEffect(() => {
    fetch("/portfolio")
      .then((res) => res.json())
      .then((res) => {
        setPortfolios(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch("/symbols")
      .then((res) => res.json())
      .then((res) => {
        setSymbols(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setForm((prevForm) => ({
      ...prevForm,
      from: newDate.format("MM/DD/yyyy"),
    }));
  };

  const handlePortfolioChange = (event) => {
    let value = event.target.value;
    if (DEFAULT_PORTFOLIO_VALUE === value) {
      value = "";
    }
    setForm((prevForm) => ({
      ...prevForm,
      Portfolio: value,
    }));
  };

  const handleSymbolChange = (event) => {
    let value = event.target.value;
    if (DEFAULT_SYMBOL_VALUE === value) {
      value = "";
    }
    setForm((prevForm) => ({
      ...prevForm,
      Symbol: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const formData = _.reduce(
      form,
      (str, value, key) => {
        return (str += `${key}=${value}&`);
      },
      ""
    );
    const url = `/cash-reports/bhavcopy?${formData.slice(0, -1)}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  return (
    <Container fluid>
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
            setData([]);
          }}
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
                        startDate: form.from,
                      }}
                      onCallback={handleDateChange}
                    >
                      <input type="text" className="form-control col-4" />
                    </DateRangePicker>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="select">
                    <Form.Label>{DEFAULT_PORTFOLIO_VALUE}</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handlePortfolioChange}
                      value={form.Portfolio}
                    >
                      <option value={null}>{DEFAULT_PORTFOLIO_VALUE}</option>
                      {Portfolios.map((item) => (
                        <option value={item.Portfolio} key={item._id}>
                          {item.Portfolio}
                        </option>
                      ))}
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
                    <Form.Label>From - To *</Form.Label>
                    <DateRangePicker
                      initialSettings={{
                        startDate: form.from,
                        endDate: moment(new Date(form.from))
                          .add("4", "days")
                          .format("MM/DD/yyyy"),
                      }}
                      onCallback={handleDateChange}
                    >
                      <input
                        type="text"
                        className="form-control col-4"
                        required
                      />
                    </DateRangePicker>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="select" className="mb-5">
                    <Form.Label>Select symbol *</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      required
                      onChange={handleSymbolChange}
                      value={form.Symbol}
                    >
                      <option>{DEFAULT_SYMBOL_VALUE}</option>
                      {Symbols.map((item) => (
                        <option value={item.name} key={item._id}>
                          {item.name}
                        </option>
                      ))}
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
        {loader ? (
          <Loader />
        ) : data.length && !loader ? (
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
