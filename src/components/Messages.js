import React from "react";
import { connect } from "react-redux";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../services/bigheads";

function Messages(props) {
  function displayMessages(message) {
    const sent = message.member.id === props.member.id;
    const userame = message.member.clientData.username; //upitnik jer nema username na loadu pa javlja error (set state prije mountanja)
    if (props.messages !== []) {
      return (
        <li key={message.timestamp} className={sent ? "sent" : "received"}>
          <div id="avatar">
            <BigHead {...getRandomOptions()} />
          </div>
          <span>{userame} said:</span>
          <span>{message.text}</span>
          <br />
          <small>{message.timestamp}</small>
        </li>
      );
    }
  }
  return (
    <div id="messages">
      <span id="welcomeMsg">Hello, {props.member.username}!</span>
      <ul className="container">
        {props.messages.map((message) => {
          return displayMessages(message);
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    member: state.member,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
