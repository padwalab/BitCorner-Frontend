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
      <Container>
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
                </Row>
              ))}
          </Card.Body>
        </Card>
      </Container>
    ) : null;
    return <Container fluid>{myorder}</Container>;
  }
}

export default MyOrders;
