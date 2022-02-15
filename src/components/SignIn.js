import React, { Component } from "react";

export default class SignIn extends Component {
  render() {
    return (
      <div>
        <h2>Sign in!</h2>
        <form onSubmit={this.props.handleSubmit}>
          <input
            id="username"
            value={this.props.value}
            onChange={this.props.handleChange}
          ></input>
          <button onClick={this.props.handleSubmit} type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
