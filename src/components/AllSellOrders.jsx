import axios from "axios";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as V1APIS from "../apis/v1";
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
      .get(`http://${V1APIS.SERVER}/api/orders/asks/open`, {
        params: { currency: this.props.getCurrency() },
      })
      .then((res) => this.setState({ orders: res.data }));
  };
  render() {
    let sellPrices = <h3 className="display-6">CURRENT ASKS [LAP]'s</h3>;
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
