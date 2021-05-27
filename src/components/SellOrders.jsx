import axios from "axios";
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
import * as V1APIS from "../apis/v1";

class SellOrders extends Component {
  state = {
    orders: this.props.orders("SELL"),
  };
  componentDidMount = () => {
    this.getSellOrders();
    this.interval = setInterval(() => {
      this.getSellOrders();
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getSellOrders = () => {
    axios
      .get(`http://${V1APIS.SERVER}/api/orders/all/sell/${this.props.userId}`)
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let myBuyOrders = <h3 className="display-6">MY SELL ORDERS</h3>;
    console.log("SellOrders", this.state.orders);
    let myorder = this.state.orders ? (
      <React.Fragment>
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

export default SellOrders;
