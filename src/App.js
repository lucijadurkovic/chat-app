import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";
import SignOut from "./components/SignOut";

import { handleMsgChange, clearMsg, pushMsg } from "./redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.setState({ members: members });
    });

    //pokrene se kad 2.put uđem u sobu
    this.room.on("member_join", (member) => {
      console.log(member);
      console.log("join");
      //alert(`${member.clientData.username} joined the chat`);
      const members = this.state.members;
      members.push(member);
      this.setState({ members });
    });

    //pokreće se na unsubscribe (povratak na listu soba) ili close tab
    this.room.on("member_leave", (member) => {
      const members = [...this.state.members];
      //   alert(`${member.clientData.username} left the chat`); //obrisati ovog člana iz arraya membersa

      // filter out the item being deleted
      const updatedMembers = members.filter(
        (clan) => clan.clientData.username !== member.clientData.username
      );
      this.setState({ members: updatedMembers });
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
    this.setState({ members: [] });
  }

  render() {
    console.log("render");
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
          <Messages member={this.props.member} />
          <Input
            value={this.props.text}
            handleSend={(e) => this.handleSend(e)}
            handleChange={this.props.handleMsgChange}
          />
        </div>
        <div>
          <Link onClick={() => this.handleUnsubscribe()} to="/">
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
  };
}

const mapDispatchToProps = {
  handleMsgChange,
  clearMsg,
  pushMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
