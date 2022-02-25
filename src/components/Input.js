import React from "react";
import { connect } from "react-redux";
import { handleMsgChange } from "../redux/actions";

const Input = (props) => {
  return (
    <form onSubmit={props.handleSend} id="inputMsg">
      <input
        id="msg"
        value={props.text}
        placeholder="Start typing..."
        onChange={props.handleMsgChange}
      ></input>
      <button type="submit" onClick={props.handleSend}>
        <img src="../media/send.png" alt="send" />
      </button>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    text: state.text,
  };
}

const mapDispatchToProps = {
  handleMsgChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
