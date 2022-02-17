import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "../../App.css";

import { handleMsgChange, clearMsg, pushMsg } from "../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      members: [],
    };
    this.drone = new window.Scaledrone("aOKticzsZfKAfItm", {
      data: this.props.member,
    });

    //dodaje clientID useru
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("on open");
      const member = this.props.member;
      member.id = this.drone.clientId;
    });

    this.room = this.drone.subscribe(`observable-${this.props.room}`);
    this.room.ime = this.props.room;

    //dodaje nove poruke u messages state
    this.room.on("message", (message) => {
      console.log("room on message - PUSH");
      const { data, member, timestamp } = message;
      console.log(message);
      let vrijeme = timestamp * 1000;
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      vrijeme = `${hours} : ${minutes.substr(-2)} : ${seconds.substr(-2)}`;

      const messages = this.state.messages;
      messages.push({ member, text: data, timestamp: vrijeme });
      this.setState({ messages: messages });
    });
    this.room.on("members", (members) => {
      this.setState({ members: members });
    });
  }
  displayMembers(member) {
    return <li key={Math.random() + 5}>{member.clientData?.username}</li>;
  }

  //publisha poruke u sobu, prima iz input fielda vrijednost - dobije ju al se ne vidi na screenu - mislim da tu fali dom manipulacija
  onSendMessage(message) {
    console.log("onsendmessage - PUBLISH");
    this.drone.publish({
      room: `observable-${this.props.room}`,
      message,
    });
  }

  //zove drone publish i vraća input na prazno
  handleSend(event) {
    event.preventDefault();
    this.onSendMessage(this.props.text);
    this.props.clearMsg();
  }

  render() {
    return (
      <div id="app">
        <div id="aside">
          <div id="online">
            <h3>Tko je online:</h3>
            <ul>
              {this.state.members.map((member) => this.displayMembers(member))}
            </ul>
          </div>
        </div>
        <div id="chat-area">
          <h3>Soba: {this.room.ime}</h3>
          <Messages member={this.props.member} messages={this.state.messages} />
          <Input
            value={this.props.text}
            handleSend={(e) => this.handleSend(e)}
            handleChange={this.props.handleMsgChange}
          />
        </div>
        <div>
          <Link to="/">Povratak na listu soba</Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    text: state.text,
    member: state.member,
  };
}

const mapDispatchToProps = {
  handleMsgChange,
  clearMsg,
  pushMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
