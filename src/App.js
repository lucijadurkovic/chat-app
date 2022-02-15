import "./App.css";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {
        username: "",
      },
      value: "",
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    this.setState({
      member: { username: username },
      value: "",
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Lucija's chatroom!</h1>
        {this.state.member.username ? (
          <Home member={this.state.member} />
        ) : (
          <SignIn
            value={this.state.value}
            handleSubmit={(e) => this.handleSubmit(e)}
            handleChange={(e) => this.handleChange(e)}
          />
        )}
      </div>
    );
  }
}
