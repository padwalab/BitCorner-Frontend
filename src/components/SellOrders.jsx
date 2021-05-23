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

class SellOrders extends Component {
  state = {
    orders: this.props.orders("SELL"),
  };
  render() {
    let myBuyOrders = <h3 className="display-6">MY SELL ORDERS</h3>;
    console.log("SellOrders", this.state.orders);
    let myorder = this.state.orders ? (
      <Container>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{myBuyOrders}</Row>
          </Card.Header>
          <Card.Body>
            {this.state.orders.map((item) => (
              <Row key={item.id}>
                <Col>{item.currency}</Col>
                <Col>{item.type}</Col>
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

export default SellOrders;