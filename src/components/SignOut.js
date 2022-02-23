import React from "react";
import { Link } from "react-router-dom";
import { handleSubmit } from "../redux/actions";
import { connect } from "react-redux";

const SignOut = (props) => {
  const resetUsername = () => {
    props.handleSubmit("");
  };
  return (
    <Link id="signOut" to="/" onClick={resetUsername}>
      Signout
    </Link>
  );
};

function mapStateToProps(state) {
  return {
    member: state.member,
  };
}

const mapDispatchToProps = {
  handleSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
