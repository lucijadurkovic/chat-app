import React from "react";
import { connect } from "react-redux";

const Messages = (props) => {
  const displayMessages = (message) => {
    const sent = message.member.id === props.member.id;
    const userame = message.member.clientData?.username; //upitnik jer nema username na loadu pa javlja error (set state prije mountanja)
    if (props.messages !== []) {
      return (
        <ul className="container">
          <li key={Math.random() + 1} className={sent ? "sent" : "received"}>
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
  };
  return (
    <div>
      <span>Bok, {props.member.username || "stranger"}!</span>
      <div>{props.messages.map((message) => displayMessages(message))}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
