import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

class MyOrders extends Component {
  state = {
    orders: this.props.orders("BUY"),
  };
  render() {
    let myBuyOrders = <h3 className="display-6">MY BUY ORDERS</h3>;
    console.log("myorders", this.state.orders);
    let myorder = this.state.orders ? (
      <React.Fragment>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{myBuyOrders}</Row>
          </Card.Header>
          <Card.Body>
            {this.state.orders
              .sort((a, b) => a.id > b.id)
              .map((item) => (
                <Row key={item.id}>
                  <Col>{item.currency}</Col> <Col>{item.type}</Col>
                  <Col>{item.units}</Col>
                  <Col>{item.status}</Col>
                  <Col>{item.variant}</Col>
                  <Col>{item.limitamt}</Col>
                </Row>
              ))}
          </Card.Body>
        </Card>
      </React.Fragment>
    ) : null;
    return <React.Fragment fluid>{myorder}</React.Fragment>;
  }
}

export default MyOrders;
