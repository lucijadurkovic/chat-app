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
  ADD_AVATAR,
} from "./actions";

const initialState = {
  member: { username: "", color: "" },
  valueSignIn: "",
  text: "",
  messages: [],
  members: [],
};

const colors = ["darkmagenta", "darkgreen", "darkred", "darkblue"];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_USERNAME:
      return { ...state, valueSignIn: action.payload };
    case HANDLE_SUBMIT:
      return {
        ...state,
        member: {
          username: action.payload,
          color: colors[Math.floor(Math.random() * 4)],
        },
      };
    case ADD_MEMBER_ID:
      return {
        ...state,
        member: {
          username: state.member.username,
          id: action.payload,
          color: state.member.color,
        },
      };
    case ADD_AVATAR:
      return {
        ...state,
        member: {
          username: state.member.username,
          id: state.member.id,
          color: state.member.color,
          avatar: action.payload,
        },
      };

    case PUSH_MEMBERS: {
      let members = state.members.concat(action.payload);
      return { ...state, members: members };
    }
    case UNSUBSCRIBE: {
      return { ...state, members: [], messages: [] };
    }
    case HANDLE_MSG:
      return { ...state, text: action.payload };
    case CLEAR_MSG:
      return { ...state, text: initialState.text };
    case PUSH_MSG: {
      return { ...state, messages: [...state.messages, action.payload] };
    }
    case REMOVE_MEMBER: {
      let memberToRemove = action.payload;
      let newMembers = state.members.filter(
        (clan) => clan.id !== memberToRemove.id
      );

      return { ...state, members: newMembers };
    }

    default:
      return state;
  }
}
