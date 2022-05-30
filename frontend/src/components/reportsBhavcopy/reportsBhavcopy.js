import React from "react";
import { Container, Table } from "react-bootstrap";
import { connect } from "react-redux";

function ReportBhavcopy(props) {
  const { data = [] } = props;
  const style = {
    position: "sticky",
    left: 0,
    zIndex: 3,
    background: "white",
  };

  return (
    <Container fluid>
      <main style={{ overflow: "auto" }}>
        {data.length ? (
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
        ) : (
          <h2 className="text-center">Please select date from menu</h2>
        )}
      </main>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.reportsBhavcopy.data,
  };
};

export default connect(mapStateToProps, null)(ReportBhavcopy);
