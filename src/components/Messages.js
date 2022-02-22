import React from "react";
import { connect } from "react-redux";

function Messages(props) {
  function displayMessages(message) {
    const sent = message.member.id === props.member.id;
    const userame = message.member.clientData.username; //upitnik jer nema username na loadu pa javlja error (set state prije mountanja)
    if (props.messages !== []) {
      return (
        <ul className="container">
          <li key={message.timestamp} className={sent ? "sent" : "received"}>
            <div>
              <span>
                {userame} said:
                <br />
              </span>
              <span>{message.text}</span>
              <br />
              <small>{message.timestamp}</small>
            </div>
          </li>
        </ul>
      );
    }
  }
  return (
    <div>
      <span>Bok, {props.member.username || "stranger"}!</span>
      <div>
        {props.messages.map((message) => {
          return displayMessages(message);
        })}
      </div>
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
