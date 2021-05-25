import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

class AllSellOrders extends Component {
  state = {
    orders: [],
  };
  componentDidMount = () => {
    this.getAllAsks();
    this.interval = setInterval(() => {
      this.getAllAsks();
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getAllAsks = () => {
    axios
      .get(`http://localhost:8080/api/orders/asks/open`)
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let sellPrices = <h3 className="display-6">CURRENT ASKS</h3>;
    console.log("sellPricesOrders", this.state.orders);
    let bids = this.state.orders ? (
      <React.Fragment>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{sellPrices}</Row>
          </Card.Header>
          <Card.Body>
            {this.state.orders.length > 0
              ? this.state.orders.map((item) => (
                  <Row key={item.id}>
                    <Col>{item.currency}</Col>
                    <Col>{item.type}</Col>
                    <Col>{item.units}</Col>
                    <Col>{item.status}</Col>
                    <Col>{item.variant}</Col>
                    <Col>{item.limitamt}</Col>
                  </Row>
                ))
              : null}
          </Card.Body>
        </Card>
      </React.Fragment>
    ) : null;
    return <React.Fragment fluid>{bids}</React.Fragment>;
  }
}

export default AllSellOrders;
