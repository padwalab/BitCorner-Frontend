import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/* <Route path="/signin" component={Signin} />
        <Route path="/login" component={Login} /> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(App);
