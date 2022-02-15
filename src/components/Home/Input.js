import React, { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSend}>
        <input
          id="msg"
          value={this.props.value}
          placeholder="Start typing..."
          onChange={this.props.handleChange}
        ></input>
        <button type="submit" onClick={this.props.handleSend}>
          Send
        </button>
      </form>
    );
  }
}
