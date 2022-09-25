import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Button from "molecule/button";
import "bootstrap-daterangepicker/daterangepicker.css";
import Loader from "../loader";
import _ from "lodash";

function FoReportsBhavcopy(props) {
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };
  const [form, setForm] = useState({
    from: "05/23/2022",
    ExpireDate: "10/30/2022",
  });
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleDateChange = (newDate) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        from: newDate.format("MM/DD/yyyy"),
      };
    });
  };

  const handleExpireDateChange = (newDate) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        ExpireDate: newDate.format("MM/DD/yyyy"),
      };
    });
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
    const url = `/fo-reports/bhavcopy?${formData.slice(0, -1)}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
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
                    startDate: form.from,
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
                    startDate: form.ExpireDate,
                  }}
                  onCallback={handleExpireDateChange}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="select" className="mb-5">
                <Form.Label>
                  <span className="opacity-zero">Click the button</span>
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
      </div>
      <main style={{ overflow: "auto" }}>
        {loader ? (
          <Loader type="circle" fill="#0d6efd" />
        ) : data.length ? (
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
