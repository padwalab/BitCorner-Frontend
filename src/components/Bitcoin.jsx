import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as V1APIS from "../apis/v1";
class BitCoin extends Component {
  state = {
    btcRate: 1000,
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
      .get(`http://${V1APIS.SERVER}/api/btc/${this.props.getCurrency()}`)
      .then((res) => this.setState({ btcRate: res.data }));
  };
  render() {
    let Bitcoin = (
      <React.Fragment>
        <Row className="display-3 m-2">
          LTP: {this.props.getCurrency()} {this.state.btcRate} / BTC
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
