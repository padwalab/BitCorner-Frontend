import axios from "axios";
import React, { Component } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import * as V1APIS from "../apis/v1";
class BillsSent extends Component {
  state = {
    sent: [],
  };
  componentDidMount = () => {
    axios
      .get(
        `http://${V1APIS.SERVER}/api/bills/sent/${this.props.currentUser.id}`
      )
      .then((res) => this.setState({ sent: res.data }));
  };
  deleteBill = (id) => {
    for (let i = 0; i < this.state.sent.length; i++) {
      if (this.state.sent[i].id === id) {
        this.setState({ sent: this.state.sent.splice(i, 1) });
      }
    }
  };
  handleCancelBill = (id) => {
    axios
      .put(`http://${V1APIS.SERVER}/api/bills/cancel/${id}`)
      .then((res) => (res.status === 200 ? this.deleteBill(id) : null));
  };
  render() {
    let sentBillsHeader = <h1 className="display-6 m-2">BILLS SENT</h1>;
    return (
      <React.Fragment>
        <Row>{sentBillsHeader}</Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>PayerId</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {[...this.state.sent].map((item) => (
                <tr key={item.id}>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      disabled={item.status === "WAITING" ? false : true}
                      onClick={(e) => this.handleCancelBill(item.id)}
                    >
                      Cancel
                    </Button>
                  </td>
                  <td>{item.payer}</td>
                  <td>{item.currency}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.dueDate).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(BillsSent);
