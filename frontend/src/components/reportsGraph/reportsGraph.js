import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import config from "../../config";
import Highcharts from "highcharts";
import moment from "moment";

import "./graph.css";

function GainersLoosers(props) {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(moment().format("DD/MM/yyyy"));
  const url = `${config.BASE_URL}/cash-reports/top?date`;
  const [symbol, setSymbol] = useState("Apple");

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

  useEffect(() => {
    Highcharts.chart("container", {
      title: {
        text: `${symbol} graph from 1st Oct to 15 Oct`,
      },
      subtitle: {
        text: "Source: nsestocks.com",
      },
      yAxis: {
        title: {
          text: "Price range",
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 1,
        },
      },
      series: [
        {
          name: symbol,
          data: [
            100, 150, 120, 129, 170, 200, 115, 100, 102, 100, 100, 200, 100,
            150, 120, 129, 170, 200, 115, 100, 102, 100, 100, 200,
          ],
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });

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
                <option value="gainers">Apple</option>
                <option value="loosers">Amazon</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <DateRangePicker
                initialSettings={{
                  startDate: date,
                  endDate: moment(date, "DD/MM/yyyy").add(-10, "days"),
                  locale: {
                    format: "DD/MM/yyyy",
                  },
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
        <figure className="highcharts-figure">
          <div id="container"></div>
          <p className="highcharts-description">
            This is basic line chart showing trends in a dataset. This chart
            includes the <code>series-label</code> module, which adds a label to
            each line for enhanced readability.
          </p>
        </figure>
      </main>
    </>
  );
}

export default GainersLoosers;
