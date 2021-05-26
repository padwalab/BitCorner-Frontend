import axios from "axios";
import React, { Component } from "react";
import { Button, Row, Table, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";

class BillsRecieved extends Component {
  state = {
    recieved: [],
  };
  componentDidMount = () => {
    axios
      .get(
        `http://localhost:8080/api/bills/recieved/${this.props.currentUser.id}`
      )
      .then((res) => this.setState({ recieved: res.data }));
  };
  deleteBill = (id) => {
    for (let i = 0; i < this.state.recieved.length; i++) {
      if (this.state.recieved[i].id === id) {
        this.setState({ recieved: this.state.recieved.splice(i, 1) });
      }
    }
  };
  handleRejectBill = (id) => {
    axios
      .put(`http://localhost:8080/api/bills/reject/${id}`)
      .then((res) => (res.status === 200 ? this.deleteBill(id) : null));
  };
  handlePayBill = () => {
    axios.post(
      `http://localhost:8080/api/bills/pay/${this.state.id}/${this.state.buyCurrency}`
    );
  };
  render() {
    let RECIEVEDBillsHeader = <h1 className="display-6 m-2">BILLS RECIEVED</h1>;
    let currencyTypes = ["USD", "INR", "GBP", "EUR"];

    return (
      <React.Fragment>
        <Row>{RECIEVEDBillsHeader}</Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>BillId</th>
                <th>PayerId</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {[...this.state.recieved].map((item) => (
                <tr>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      disabled={item.status === "WAITING" ? false : true}
                      onClick={(e) => this.handleRejectBill(item.id)}
                    >
                      Reject
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-primary"
                      disabled={item.status === "WAITING" ? false : true}
                      onClick={(e) =>
                        this.setState({ showModal: true, id: item.id })
                      }
                    >
                      Pay
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

        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Pay Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Select a currency</div>

            <Typeahead
              className="m-2"
              id="basic-typeahead-single"
              labelKey="name"
              single
              onChange={(e) => {
                console.log(e[0]);
                this.setState({ buyCurrency: e[0] });
              }}
              options={currencyTypes}
              placeholder="Choose Buy Currency type..."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ showModal: false });
                this.handlePayBill();
              }}
            >
              Pay
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(BillsRecieved);
