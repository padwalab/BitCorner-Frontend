import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateProfile } from "../redux/actions/action-helper";

class BuyBitCoin extends Component {
  state = {
    btcRate: 1000,
    defaultCurrency: this.props.currentUser.bankAccount.currency,
  };
  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.getBTCPrice();
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBTCPrice = () => {
    axios
      .get(
        `http://localhost:8080/api/btc/${this.props.currentUser.bankAccount.currency}`
      )
      .then((res) => this.setState({ btcRate: res.data }));
  };
  render() {
    let buyBitcoin = (
      <React.Fragment>
        <Row className="display-5 m-2">
          {this.state.defaultCurrency} {this.state.btcRate} / BTC
        </Row>
      </React.Fragment>
    );
    return (
      <Container className="w-75">
        {this.props.isLoggedIn ? (
          <React.Fragment>
            <Row>{buyBitcoin}</Row>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(BuyBitCoin);
