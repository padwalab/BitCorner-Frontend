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

  getAllAsks = () => {
    axios
      .get(`http://localhost:8080/api/orders/asks/open`)
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let sellPrices = <h3 className="display-6">CURRENT ASKS</h3>;
    console.log("sellPricesOrders", this.state.orders);
    let bids = this.state.orders ? (
      <Container>
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
                  </Row>
                ))
              : null}
          </Card.Body>
        </Card>
      </Container>
    ) : null;
    return <Container fluid>{bids}</Container>;
  }
}

export default AllSellOrders;
