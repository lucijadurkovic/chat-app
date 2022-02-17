import { connect } from "react-redux";
import { handleSubmit, handleUsername } from "../redux/actions";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  if (props.member.username === "") {
    return (
      <div className="App">
        <h1>Welcome to Lucija's chatroom!</h1>
        <h2>Sign in!</h2>
        <form onSubmit={props.handleSubmit}>
          <input id="username" onChange={props.handleUsername}></input>
          <button onSubmit={props.handleSubmit} type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div id="lista-soba">
        <h3>Lista soba:</h3>
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
        </ul>
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
