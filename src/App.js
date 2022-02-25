import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";
import SignOut from "./components/SignOut";

import {
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,
  unsubscribe,
  addAvatar,
} from "./redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "./services/bigheads";

class App extends Component {
  constructor(props) {
    super(props);
    this.drone = new window.Scaledrone("aOKticzsZfKAfItm", {
      //šaljemo info o trenutnom memberu
      data: this.props.member,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      //trenutnom memberu dajemo ID i avatar
      this.props.addMemberID(this.drone.clientId);
      this.props.addAvatar(<BigHead {...getRandomOptions()} />);
    });
    //subscribe na sobu
    this.room = this.drone.subscribe(`observable-${this.props.room}`);
    this.room.ime = this.props.room;

    //dodaje nove poruke u stanje
    this.room.on("message", (message) => {
      const { data, member, timestamp } = message;

      if (member.id === this.props.member.id) {
        member.avatar = this.props.member.avatar;
      } else {
        member.avatar = <BigHead {...getRandomOptions()} />;
      }

      let vrijeme = timestamp * 1000;
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      vrijeme = `${hours} : ${minutes.substr(-2)}`;

      this.props.pushMsg({ member, text: data, timestamp: vrijeme });
    });

    //display tko je online
    this.room.on("members", (members) => {
      this.props.pushMembers(members);
    });

    this.room.on("member_join", (member) => {
      this.props.pushMembers(member);
    });

    this.room.on("member_leave", (member) => {
      this.props.removeMember(member);
    });
  }

  onSendMessage(message) {
    this.drone.publish({
      room: `observable-${this.props.room}`,
      message,
    });
  }

  //zove drone publish, vraća input na prazno
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
          <div id="asideNaslov">
            <div>
              <img src="../media/members.png" alt="members icon" />
              <h3>Online members:</h3>
            </div>
            <ul>
              {this.props.members.map((member) => (
                <li key={Math.random() + 5}>
                  <span className="onlineDot">&#9679;</span>
                  {member.clientData.username}
                </li>
              ))}
            </ul>
          </div>
          <div id="asideBottom">
            <Link onClick={(e) => this.handleUnsubscribe(e)} to="/">
              Back to room list
            </Link>
            <br></br>
            <SignOut />
          </div>
        </div>
        <div id="chat-area">
          <div>
            <h3>
              Room name: <span>{this.room.ime}</span>
            </h3>

            <Messages />
          </div>
          <Input handleSend={(e) => this.handleSend(e)} />
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
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,
  unsubscribe,
  addAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
