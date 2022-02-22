import React from "react";
import { Link } from "react-router-dom";
import { handleSubmit } from "../redux/actions";
import { connect } from "react-redux";

const SignOut = (props) => {
  const resetUsername = () => {
    props.handleSubmit("");
  };
  return (
    <button>
      <Link to="/" onClick={resetUsername}>
        Signout
      </Link>
    </button>
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
