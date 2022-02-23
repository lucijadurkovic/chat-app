import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";
import SignOut from "./components/SignOut";

import {
  handleMsgChange,
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,
  unsubscribe,
} from "./redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.drone = new window.Scaledrone("aOKticzsZfKAfItm", {
      data: this.props.member,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      this.props.addMemberID(this.drone.clientId);
    });

    this.room = this.drone.subscribe(`observable-${this.props.room}`, {
      historyCount: 5, //ne radi
    });
    this.room.ime = this.props.room;

    //dodaje nove poruke u messages state
    this.room.on("message", (message) => {
      const { data, member, timestamp } = message;
      let vrijeme = timestamp * 1000;
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      vrijeme = `${hours} : ${minutes.substr(-2)} : ${seconds.substr(-2)}`;

      this.props.pushMsg({ member, text: data, timestamp: vrijeme });
    });

    //za display tko je online - vdjeti jel suvišna jer se displayayju u renderu
    this.room.on("members", (members) => {
      this.props.pushMembers(members);
    });

    this.room.on("member_join", (member) => {
      //  alert(`${member.clientData.username} joined the chat`);
      this.props.pushMembers(member);
    });

    this.room.on("member_leave", (member) => {
      //  alert(`${member.clientData.username} left the chat`);
      this.props.removeMember(member);
    });
  }

  onSendMessage(message) {
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

  handleUnsubscribe() {
    this.room.unsubscribe();
    this.props.unsubscribe();
  }

  render() {
    return (
      <div id="app">
        <div id="online">
          <div id="aside">
            <div id="asideNaslov">
              <img src="../media/members.png" />
              <h3>Online members:</h3>

              <ul>
                {this.props.members.map((member) => (
                  <li key={Math.random() + 5}>
                    <span className="onlineDot">&#9679;</span>
                    {member.clientData?.username}
                  </li>
                ))}
              </ul>
            </div>
            <div id="asideBottom">
              <Link onClick={(e) => this.handleUnsubscribe(e)} to="/">
                Back to room list
              </Link>
              <br />
              <SignOut />
            </div>
          </div>
        </div>
        <div id="chat-area">
          <h3>
            Room name: <span>{this.room.ime}</span>
          </h3>
          <Messages member={this.props.member}></Messages>

          <Input
            value={this.props.text}
            handleSend={(e) => this.handleSend(e)}
            handleChange={this.props.handleMsgChange}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    text: state.text,
    member: state.member,
    messages: state.messages,
    members: state.members,
  };
}

const mapDispatchToProps = {
  handleMsgChange,
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,
  unsubscribe,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
