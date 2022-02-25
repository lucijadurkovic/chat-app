export const HANDLE_SUBMIT = "HANDLE_SUBMIT";
export const HANDLE_USERNAME = "HANDLE_CHANGE";
export const HANDLE_MSG = "HANDLE_MSG";
export const CLEAR_MSG = "CLEAR_MSG";
export const PUSH_MSG = "PUSH_MSG";
export const PUSH_MEMBERS = "PUSH_MEMBERS";
export const ADD_MEMBER_ID = "ADD_MEMBER_ID";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const ADD_AVATAR = "ADD_AVATAR";

export const handleSubmit = () => {
  let username = document.getElementById("username").value;
  return { type: HANDLE_SUBMIT, payload: username };
};

export const handleUsername = () => {
  let username = document.getElementById("username").value;
  return { type: HANDLE_USERNAME, payload: username };
};

export const addMemberID = (id) => {
  return { type: ADD_MEMBER_ID, payload: id };
};
export const addAvatar = (avatar) => {
  return { type: ADD_AVATAR, payload: avatar };
};

export const handleMsgChange = () => {
  let msg = document.getElementById("msg").value;
  return { type: HANDLE_MSG, payload: msg };
};

export const clearMsg = () => {
  return { type: CLEAR_MSG };
};

export const pushMsg = (newMsg) => {
  return { type: PUSH_MSG, payload: newMsg };
};

export const pushMembers = (newMembers) => {
  return { type: PUSH_MEMBERS, payload: newMembers };
};

export const removeMember = (member) => {
  return { type: REMOVE_MEMBER, payload: member };
};
export const unsubscribe = () => {
  return { type: UNSUBSCRIBE };
};
