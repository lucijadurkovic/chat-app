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
} from "./redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.drone = new window.Scaledrone("aOKticzsZfKAfItm", {
      data: this.props.member,
    });

    //dodaje clientID useru
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = this.props.member;
      member.id = this.drone.clientId;
    });

    this.room = this.drone.subscribe(`observable-${this.props.room}`, {
      historyCount: 5, //ne radi
    });
    this.room.ime = this.props.room;

    //dodaje nove poruke u messages state
    this.room.on("message", (message) => {
      console.log("room on message - PUSH");
      const { data, member, timestamp } = message;
      let vrijeme = timestamp * 1000;
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      vrijeme = `${hours} : ${minutes.substr(-2)} : ${seconds.substr(-2)}`;

      this.props.pushMsg({ member, text: data, timestamp: vrijeme }); //nema novog rendera
      console.log(this.props.messages);
    });

    //za display tko je online
    this.room.on("members", (members) => {
      this.props.pushMembers({ payload: members });
    });

    //pokrene se kad 2.put uđem u sobu
    this.room.on("member_join", (member) => {
      console.log(member);
      console.log("join");
      //alert(`${member.clientData.username} joined the chat`);
      this.props.pushMembers({ payload: [...this.props.members, member] });
    });

    //pokreće se na unsubscribe (povratak na listu soba) ili close tab
    this.room.on("member_leave", (member) => {
      const members = [...this.props.members];
      //   alert(`${member.clientData.username} left the chat`); //obrisati ovog člana iz arraya membersa

      // filter out the item being deleted
      const updatedMembers = members.filter(
        (clan) => clan.clientData.username !== member.clientData.username
      );
      this.props.pushMembers({ payload: updatedMembers });
    });
  }

  displayMembers(member) {
    return <li key={Math.random() + 5}>{member.clientData?.username}</li>;
  }

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

  handleUnsubscribe() {
    this.room.unsubscribe();
    this.props.pushMembers({ payload: [] });
  }

  render() {
    console.log("render");
    return (
      <div id='app'>
        <div id='aside'>
          <div id='online'>
            <h3>Tko je online:</h3>
            <ul>
              {this.props.members.map((member) => this.displayMembers(member))}
            </ul>
          </div>
        </div>
        <div id='chat-area'>
          <h3>Soba: {this.room.ime}</h3>
          <Messages />
          <Input
            value={this.props.text}
            handleSend={(e) => this.handleSend(e)}
            handleChange={this.props.handleMsgChange}
          />
        </div>
        <div>
          <Link onClick={() => this.handleUnsubscribe()} to='/'>
            Povratak na listu soba
          </Link>
          <br />
          <SignOut />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
