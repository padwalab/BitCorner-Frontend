import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";

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
            {this.state.orders.map((item) => (
              <Row key={item.id}>
                {item.currency} {item.type} {item.units}
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Container>
    ) : null;
    return <Container className="border">{myorder}</Container>;
  }
}

export default MyOrders;
