// import React, { Component } from "react";
// import {
//   Container,
//   Dropdown,
//   Form,
//   InputGroup,
//   Button,
//   Row,
//   Col,
//   Alert,
// } from "react-bootstrap";
// import axios from "axios";
// import { Typeahead } from "react-bootstrap-typeahead";
// import { connect } from "react-redux";
// import { Redirect } from "react-router";
// import { updateProfile } from "../redux/actions/action-helper";

// import Currency from "./Currency";

// class BankAccountDetails extends Component {
//   state = {
//     bankName:
//       this.props.bankAccount
//         ? this.props.bankAccount.bankName
//         : "First Republic Bank",
//     country:
//       this.props.bankAccount
//         ? this.props.bankAccount.country
//         : "US",
//     accountNumber:
//       this.props.bankAccount
//         ? this.props.bankAccount.accountNumber
//         : 1234567890,
//     currency:
//       this.props.bankAccount
//         ? this.props.bankAccount.currency
//         : "USD",
//     success: false,
//     warning: false,
//   };

//   handleCreateBankAccount = (e) => {
//     e.preventDefault();
//     let cloneState = Object.assign({}, this.state);
//     delete cloneState.success;
//     delete cloneState.warning;
//     console.log(this.state);
//     axios
//       .post(`http://localhost:8080/api/accounts/${this.props.currentUser.id}`, {
//         //done
//         ...cloneState,
//       })
//       .then((res) => {
//         console.log("repsonse data: ", res.data);
//         this.setState({ success: true, warning: false });
//         this.props.updateProfile(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ warning: true, success: false });
//       });
//   };

//   handleBankName = (bankName) => {
//     this.setState({ bankName });
//   };
//   handleCountry = (country) => {
//     this.setState({ country });
//   };
//   handleAccountNumber = (accountNumber) => {
//     this.setState({ accountNumber });
//   };
//   handleCurrency = (currency) => {
//     this.setState({ currency });
//   };

//   render() {
//     let currencyTypes = ["USD", "INR", "GBP", "EUR"];
//     const { bankAccount } = this.props.currentUser;

//     let currencies = bankAccount.currencies ? (
//       <React.Fragment>
//         {bankAccount.currencies.map((currency) => {
//           console.log(currency);
//           <Currency key={currency.id} currencyItem={currency} />;
//         })}
//       </React.Fragment>
//     ) : null;

//     let BankAccount = (
//       <Form onSubmit={(e) => this.handleCreateBankAccount(e)}>
//         {this.state.warning ? (
//           <Alert variant="danger">Add Account Failed</Alert>
//         ) : null}
//         {this.state.success ? (
//           <Alert variant="success">Add Account Success</Alert>
//         ) : null}

//         <Row>
//           <Form.Label className="m-2 display-5">
//             {bankAccount ? "BANK ACCOUNT DETAILS" : "ADD A BANK ACCOUNT"}
//           </Form.Label>
//         </Row>
//         <Row>
//           <Col>
//             <Form.Group className="m-2">
//               <Form.Label className="m-2">Bank Name:</Form.Label>
//               <Form.Control
//                 className="m-2"
//                 onChange={(e) => this.handleBankName(e.target.value)}
//                 type="text"
//                 value={this.state.bankName}
//                 readOnly={bankAccount ? true : false}
//               />
//             </Form.Group>
//             <Form.Group className="m-2">
//               <Form.Label className="m-2">Account No:</Form.Label>
//               <Form.Control
//                 className="m-2"
//                 onChange={(e) => this.handleAccountNumber(e.target.value)}
//                 type="number"
//                 value={this.state.accountNumber}
//                 readOnly={bankAccount ? true : false}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group className="m-2">
//               <Form.Label className="m-2">Default Currency:</Form.Label>
//               <Typeahead
//                 className="m-2"
//                 id="basic-typeahead-single"
//                 labelKey="name"
//                 single
//                 onChange={(e) => this.setState({ currency: e[0] })}
//                 options={currencyTypes}
//                 // selected={this.state.currency}
//                 placeholder="Choose Currency type..."
//                 readOnly={bankAccount ? true : false}
//               />
//             </Form.Group>
//             <Form.Group className="m-2">
//               <Form.Label className="m-2">Country:</Form.Label>
//               <Form.Control
//                 className="m-2"
//                 onChange={(e) => this.handleCountry(e.target.value)}
//                 type="string"
//                 value={this.state.country}
//                 readOnly={bankAccount ? true : false}
//               />
//             </Form.Group>
//             <Form.Group className="m-2">
//               <Form.Label className="m-2"></Form.Label>
//             </Form.Group>
//             <Button
//               className="justify-content-end"
//               variant="outline-primary"
//               type="submit"
//               disabled={bankAccount ? true : false}
//             >
//               Add Account
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     );
//     return <React.Fragment>{bankAccount}</React.Fragment>;
//   }
// }

// const mapStateToProps = (state) => state;
// export default connect(mapStateToProps, { updateProfile })(BankAccountDetails);
