import "./App.css";
import Home from "./components/Home/Home";
import HomeF from "./components/Home/HomeF";
import SignIn from "./components/SignIn";
import { connect } from "react-redux";
import { handleSubmit, handleUsername } from "./redux/actions";
import React from "react";

const App = (props) => {
  return (
    <div className="App">
      <h1>Welcome to Lucija's chatroom!</h1>
      {props.member.username ? (
        <div>
          <Home member={props.member} rooms={["General", "Games", "Sport"]} />
        </div>
      ) : (
        <SignIn
          handleSubmit={props.handleSubmit}
          handleChange={props.handleUsername}
        />
      )}
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
