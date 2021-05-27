import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

class MyOrders extends Component {
  state = {
    orders: this.props.orders("BUY"),
  };
  componentDidMount = () => {
    this.getBuyOrders();
    this.interval = setInterval(() => {
      this.getBuyOrders();
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBuyOrders = () => {
    axios
      .get(
        `http://ec2-18-190-25-33.us-east-2.compute.amazonaws.com:8080/api/orders/all/buy/${this.props.userId}}`
      )
      .then((res) => this.setState({ orders: res.data }));
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
