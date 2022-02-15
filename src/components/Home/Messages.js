import React, { Component } from "react";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
  }

  displayMessages(message) {
    const sent = message.member.id === this.props.loggedInMember.id; //ovo je undefined, fali clientdata al neće ni s tim
    console.log(this.props.loggedInMember.id); //ok
    console.log(message);
    console.log(message.member); //ok - OVAJ USERNAME STAVITI U RETURN A NE LOGGEDIN, samo ga treba dohvatiti
    const userame = message.member.clientData?.username;
    console.log(message.member.clientData?.username); //upitnik jer nema username na loadu pa javlja error (set state prije mountanja)

    console.log(message.member.id); //ok

    if (this.props.messages !== []) {
      return (
        <ul className="container">
          <li key={Math.random() + 1} className={sent ? "sent" : "received"}>
            <div>
              <span>
                {userame} said:
                <br />
              </span>
              <span>{message.text}</span>
            </div>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <span>Bok, {this.props.loggedInMember.username}!</span>
        <div>
          {this.props.messages.map((message) => this.displayMessages(message))}
        </div>
      </div>
    );
  }
}
