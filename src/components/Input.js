import React from "react";

const Input = (props) => {
  return (
    <form onSubmit={props.handleSend} id="inputMsg">
      <input
        id="msg"
        value={props.value}
        placeholder="Start typing..."
        onChange={props.handleChange}
      ></input>
      <button type="submit" onClick={props.handleSend}>
        <img src="../media/send.png" alt="send" />
      </button>
    </form>
  );
};

export default Input;
