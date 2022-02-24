import { connect } from "react-redux";
import { handleSubmit, handleUsername } from "../redux/actions";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  if (props.member.username === "") {
    return (
      <div className="signIn">
        <img src="../media/chat.png" alt="chat icon"></img>
        <form id="signinForm" onSubmit={props.handleSubmit}>
          <h1>Welcome to my ChatApp.</h1>
          <h2>Pick a username:</h2>
          <div>
            <input id="username" onChange={props.handleUsername}></input>
            <button id="signinBtn" onSubmit={props.handleSubmit} type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div id="listaSoba">
        <div>
          <h1>Room list:</h1>
          <ul>
            <li key={Math.random() + 3}>
              <Link to="/General">General</Link>
            </li>
            <li key={Math.random() + 3}>
              <Link to="/Games">Games</Link>
            </li>
            <li key={Math.random() + 3}>
              <Link to="/Sport">Sport</Link>
            </li>
            <li key={Math.random() + 3}>
              <Link to="/Fashion">Fashion</Link>
            </li>
          </ul>
        </div>
        <img src="../media/chat.png" alt="chat icon"></img>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    member: state.member,
    valueSignIn: state.valueSignIn,
  };
}

const mapDispatchToProps = {
  handleSubmit,
  handleUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
