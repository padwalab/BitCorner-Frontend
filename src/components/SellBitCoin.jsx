import axios from "axios";
import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import Bitcoin from "./Bitcoin";
import { updateProfile } from "../redux/actions/action-helper";
class SellBitCoin extends Component {
  state = {
    SellAmount: 0,
    sellCurrency:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currency
        : "USD",
    insufficient: false,
    currencies:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currencies
        : null,
    success: false,
    warning: false,
  };

  checkFunds = () => {
    this.state.currencies.forEach((item) => {
      if (item.currency === "BTC") {
        item.amount < this.state.SellAmount
          ? this.setState({ insufficient: true })
          : this.setState({ insufficient: false });
      }
    });
  };
  handleSellOrder = () => {
    axios
      .post(
        `http://localhost:8080/api/orders/sell/${this.props.currentUser.id}`,
        {
          units: this.state.SellAmount,
          variant: "MARKET",
          currency: this.state.sellCurrency,
        }
      )
      .then((res) => {
        this.props.updateProfile(res.data);
        this.setState({ success: true, warning: false });
      })
      .catch((error) => this.setState({ success: false, warning: true }));
  };

  handleSellAmount = async (SellAmount) => {
    await this.setState({ SellAmount });
    await this.checkFunds();
  };
  render() {
    let SELLBitcoinHeader = <h1 className="display-5 m-2">SELL BITCOIN</h1>;
    let currencyTypes = ["USD", "INR", "GBP", "EUR"];
    return (
      <Container className="w-75">
        <Row>
          {this.state.warning ? (
            <Alert variant="danger">Buy Order Failed</Alert>
          ) : null}
          {this.state.success ? (
            <Alert variant="success">Buy Order placed</Alert>
          ) : null}
          <Card className="m-2" bg="light" text="dark">
            <Card.Header as="h5">
              <Row xs={3}>
                <Col className="m-2">{SELLBitcoinHeader}</Col>
                <Col>
                  <Typeahead
                    className="m-4"
                    id="basic-typeahead-single"
                    labelKey="name"
                    single
                    onChange={(e) => this.setState({ sellCurrency: e[0] })}
                    options={currencyTypes}
                    placeholder="Choose Buy Currency type..."
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Col>
                  <Bitcoin currency={this.state.sellCurrency} />
                </Col>
              </Card.Title>
              <Row>
                <Col xs={3}>
                  <Form.Group className="m-2">
                    <Form.Control
                      className="m-2"
                      onChange={(e) => {
                        this.handleSellAmount(e.target.value);
                      }}
                      type="number"
                      value={this.state.SellAmount}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group className="m-2">
                    <Button
                      variant="outline-primary"
                      disabled={this.state.insufficient}
                      onClick={(e) => this.handleSellOrder()}
                    >
                      Sell
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(SellBitCoin);
