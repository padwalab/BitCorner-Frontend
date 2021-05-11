import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class BitCoin extends Component {
  state = {
    btcRate: 1000,
    defaultCurrency: this.props.currency
      ? this.props.currency
      : this.props.currentUser && this.props.currentUser.bankAccount
      ? this.props.currentUser.bankAccount.currency
      : "USD",
  };
  componentDidMount = () => {
    this.getBTCPrice();
    this.interval = setInterval(() => {
      this.getBTCPrice();
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBTCPrice = () => {
    axios
      .get(`http://localhost:8080/api/btc/${this.state.defaultCurrency}`)
      .then((res) => this.setState({ btcRate: res.data }));
  };
  render() {
    let Bitcoin = (
      <React.Fragment>
        <Row className="display-3 m-2">
          {this.state.defaultCurrency} {this.state.btcRate} / BTC
        </Row>
      </React.Fragment>
    );
    return (
      <Container>
        {this.props.isLoggedIn ? (
          <React.Fragment>
            <Row>{Bitcoin}</Row>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(BitCoin);
