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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getAllBids = () => {
    axios
      .get(
        `http://ec2-18-190-25-33.us-east-2.compute.amazonaws.com:8080/api/orders/bids/open`,
        { params: { currency: this.props.getCurrency() } }
      )
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let bidPrices = <h3 className="display-6">CURRENT BIDS</h3>;
    console.log("bidPricesOrders", this.state.orders);
    let bids = this.state.orders ? (
      <React.Fragment>
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

export default AllBuyOrders;
