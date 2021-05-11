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
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import Bitcoin from "./Bitcoin";
import { updateProfile } from "../redux/actions/action-helper";

class BuyBitCoin extends Component {
  state = {
    currencies:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currencies
        : null,
    buyAmount: 0,
    buyCurrency:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currency
        : "USD",
    insufficient: false,
    success: false,
    warning: false,
  };

  checkFunds = () => {
    axios
      .get(
        `http://localhost:8080/api/btc/${this.state.buyCurrency}/${this.state.buyAmount}`
      )
      .then((res) => {
        this.state.currencies.forEach((item) => {
          if (item.currency === this.state.buyCurrency) {
            item.amount < res.data
              ? this.setState({ insufficient: true })
              : this.setState({ insufficient: false });
          }
        });
      });
  };

  handleBuyOrder = () => {
    axios
      .post(
        `http://localhost:8080/api/orders/buy/${this.props.currentUser.id}`,
        {
          units: this.state.buyAmount,
          variant: "MARKET",
          currency: this.state.buyCurrency,
        }
      )
      .then((res) => {
        this.props.updateProfile(res.data);
        this.setState({ success: true, warning: false });
      })
      .catch((error) => this.setState({ success: false, warning: true }));
  };

  handleBuyAmount = async (buyAmount) => {
    await this.setState({ buyAmount });
    await this.checkFunds();
  };
  render() {
    let buyBitcoinHeader = <h1 className="display-5 m-2">BUY BITCOIN</h1>;
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
                <Col className="m-2">{buyBitcoinHeader}</Col>
                <Col>
                  <Typeahead
                    className="m-4"
                    id="basic-typeahead-single"
                    labelKey="name"
                    single
                    onChange={(e) => {
                      this.setState({ buyCurrency: e[0] });
                    }}
                    options={currencyTypes}
                    placeholder="Choose Buy Currency type..."
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Col>
                  <Bitcoin currency={this.state.buyCurrency} />
                </Col>
              </Card.Title>
              <Row>
                <Col xs={3}>
                  <Form.Group className="m-2">
                    <Form.Control
                      className="m-2"
                      onChange={(e) => {
                        this.handleBuyAmount(e.target.value);
                      }}
                      type="number"
                      value={this.state.buyAmount}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group className="m-2">
                    <Button
                      variant="outline-primary"
                      disabled={this.state.insufficient}
                      onClick={(e) => this.handleBuyOrder()}
                    >
                      Buy
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
export default connect(mapStateToProps, { updateProfile })(BuyBitCoin);
