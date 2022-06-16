import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import config from "../../config";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import "./graph.css";

function GainersLoosers(props) {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("05/27/2022");
  const url = `${config.BASE_URL}/cash-reports/top?date`;
  const [symbol, setSymbol] = useState("CoalIndia");

  const options = {
    title: {
      text: `${symbol} line graph from 22nd May to 27th May`,
    },
    yAxis: {
      title: {
        text: "Price range",
      },
    },
    series: [
      {
        name: symbol,
        data: [
          100, 150, 120, 129, 170, 200, 115, 100, 102, 100, 100, 200, 100, 150,
          120, 129, 170, 200, 115, 100, 102, 100, 100, 200,
        ],
      },
    ],
  };

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
        <Row className="justify-content-md-center">
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Symbol</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
              >
                <option value="CoalIndia">CoalIndia</option>
                <option value="20Microne">20Microne</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <DateRangePicker
                initialSettings={{
                  startDate: moment(date).add(-5, "days"),
                  endDate: date,
                }}
                onCallback={(start, end) => {
                  console.log(moment(start).format("DD/MM/yyyy"));
                  console.log(moment(end).format("DD/MM/yyyy"));
                }}
              >
                <input type="text" className="form-control col-4" />
              </DateRangePicker>
            </Form.Group>
          </Col>
          <Col md="3">
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
        <HighchartsReact highcharts={Highcharts} options={options} />
      </main>
    </>
  );
}

export default GainersLoosers;
