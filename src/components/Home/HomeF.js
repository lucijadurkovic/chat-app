import React, { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { handleMsgChange, clearMsg, pushMsg } from "../../redux/actions";
import { connect } from "react-redux";

const HomeF = (props) => {
  // const [messages, setMsgs] = useState([]);

  const drone = new window.Scaledrone("aOKticzsZfKAfItm", {
    data: props.member,
  });
  const member = props.member;
  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("on open");

    member.id = drone.clientId;
  });

  const room = drone.subscribe("observable-room");
  room.on("message", (message) => {
    console.log("room on message - PUSHANJE");
    const { data, member } = message;
    console.log(message);

    const messages2 = props.messages;
    messages2.push({ member, text: data });

    pushMsg(messages2);
    console.log(props.messages);
  });

  const handleSend = (event) => {
    console.log("handle send");
    event.preventDefault();
    onSendMessage(props.text);
    props.clearMsg();
  };

  const onSendMessage = (message) => {
    console.log("onsendmessage - PUBLISH");
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div>
      <Messages member={member} messages={props.messages} />
      <Input
        value={props.text}
        handleSend={handleSend}
        handleChange={props.handleMsgChange}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    text: state.text,
    messages: state.messages,
  };
}

const mapDispatchToProps = {
  handleMsgChange,
  clearMsg,
  pushMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeF);
