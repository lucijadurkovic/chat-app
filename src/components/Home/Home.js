import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loggedInMember: this.props.member,
      value: "",
    };
    this.drone = new window.Scaledrone("aOKticzsZfKAfItm", {
      data: this.state.loggedInMember,
    });

    //dodaje clientID useru
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.loggedInMember };
      member.id = this.drone.clientId;
      this.setState({ loggedInMember: member });
      console.log(this.state.loggedInMember);
    });

    const room = this.drone.subscribe("observable-room");

    //dodaje nove poruke u messages state
    /*room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages: messages });
      console.log(messages); //ažuriraju se poruke al se ne rendera opet tj ne vide se iscrtane por - a zove opet render, testirano
    });*/

    //dodaje nove poruke u messages state - ne radi ni ova ali sve se uredno javlja u konzoli
    room.on("message", (message) => {
      const { data, member } = message;
      console.log(message);
      console.log(member);
      console.log(data);

      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages: messages });
      console.log(messages);
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //publisha poruke u sobu, prima iz input fielda vrijednost - dobije ju al se ne vidi na screenu - mislim da tu fali dom manipulacija
  onSendMessage(message) {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  }

  //zove drone publish i vraća input na prazno
  handleSend(event) {
    event.preventDefault();
    this.onSendMessage(this.state.value);
    this.setState({ value: "" });
  }

  render() {
    return (
      <div>
        <Messages
          loggedInMember={this.state.loggedInMember}
          messages={this.state.messages}
        />
        <Input
          value={this.state.value}
          handleSend={(e) => this.handleSend(e)}
          handleChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }
}
