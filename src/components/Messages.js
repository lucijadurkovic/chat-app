import React from "react";
import { connect } from "react-redux";

function Messages(props) {
  function displayMessages(message) {
    const sent = message.member.id === props.member.id;
    const userame = message.member.clientData.username;
    if (props.messages !== []) {
      return (
        <li key={Math.random() + 1} className={sent ? "sent" : "received"}>
          <div id="avatar">{message.member.avatar}</div>
          <div id="messageInfo">
            <small>{message.timestamp}</small>
            <div id="messageBody">
              <div>
                <span style={{ color: message.member.clientData.color }}>
                  {userame}
                </span>{" "}
                said:
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        </li>
      );
    }
  }
  return (
    <div id="messages">
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
