import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


class ConnectedLogin extends Component {
  state = {
    customerEmailAddress: "",
    pass: "",
    customerName:"",
    redirectToReferrer: false
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // If customer was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
      }}>
        <div
          style={{
            height: 300,
            width: 200,
            padding: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Avatar style={{ marginBottom: 10 }}>
            <LockOutlinedIcon />
          </Avatar>
          <div
            style={{
              marginBottom: 20,
              fontSize: 34,
              textAlign: "center",
                color:"#FFA812"
            }}
          >
            {" "}
            Login
            {" "}
          </div>
          <TextField
            value={this.state.customerEmailAddress}
            placeholder="Enter your email address"
            onChange={e => {
              this.setState({ customerEmailAddress: e.target.value });
            }}
          />
          <TextField
            value={this.state.pass}
            type="password"
            placeholder="Enter your password"
            onChange={e => {
              this.setState({ pass: e.target.value });
            }}
          />

          <Button
            style={{ marginTop: 30, width: 200 }}
            variant="outlined"
            color="yellow"
            onClick={() => {

              Auth.authenticate(this.state.customerEmailAddress, this.state.pass, customerEmailAddress => {

                if (!customerEmailAddress) {
                  this.setState({ wrongCred: true });
                  return;
                }

                this.props.dispatch(setLoggedInUser({ name: customerEmailAddress.name }));
                this.setState(() => ({
                  redirectToReferrer: true
                }));
              });
            }}
          >
            Login
          </Button>

            <Button
                style={{ marginTop: 30, width: 200 }}
                variant="outlined"
                color="yellow"
                onClick={() => {

                }}
            >
                Register
            </Button>

          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong email address and/or password</div>
          )}
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
