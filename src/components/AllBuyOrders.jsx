import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

class AllBuyOrders extends Component {
  state = {
    orders: [],
  };
  componentDidMount = () => {
    this.getAllBids();
    this.interval = setInterval(() => {
      this.getAllBids();
    }, 10000);
  };

  getAllBids = () => {
    axios
      .get(`http://localhost:8080/api/orders/bids/open`)
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let bidPrices = <h3 className="display-6">CURRENT BIDS</h3>;
    console.log("bidPricesOrders", this.state.orders);
    let bids = this.state.orders ? (
      <Container>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{bidPrices}</Row>
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

export default AllBuyOrders;
