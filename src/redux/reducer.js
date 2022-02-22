import {
  HANDLE_USERNAME,
  HANDLE_SUBMIT,
  HANDLE_MSG,
  CLEAR_MSG,
  PUSH_MSG,
  PUSH_MEMBERS,
  ADD_MEMBER_ID,
  REMOVE_MEMBER,
  UNSUBSCRIBE,
} from "./actions";

const initialState = {
  member: { username: "", id: null },
  valueSignIn: "",
  text: "",
  messages: [],
  members: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SUBMIT:
      return {
        ...state,
        member: { username: action.payload, id: state.member.id },
      };
    case ADD_MEMBER_ID:
      return {
        ...state,
        member: { username: state.member.username, id: action.payload },
      };
    case HANDLE_USERNAME:
      return { ...state, valueSignIn: action.payload };
    case HANDLE_MSG:
      return { ...state, text: action.payload };
    case CLEAR_MSG:
      return { ...state, text: initialState.text };
    case PUSH_MSG: {
      return { ...state, messages: [...state.messages, action.payload] };
    }
    case PUSH_MEMBERS: {
      let members = state.members.concat(action.payload);
      return { ...state, members: members };
    }
    case REMOVE_MEMBER: {
      let memberToRemove = action.payload;
      let newMembers = state.members.filter(
        (clan) =>
          clan.clientData.username !== memberToRemove.clientData.username
      );

      return { ...state, members: newMembers };
    }
    case UNSUBSCRIBE: {
      return { ...state, members: [] };
    }

    default:
      return state;
  }
}
