import {
  HANDLE_USERNAME,
  HANDLE_SUBMIT,
  HANDLE_MSG,
  CLEAR_MSG,
  PUSH_MSG,
} from "./actions";

const initialState = {
  member: { username: "", id: 0 },
  valueSignIn: "",
  text: "",
  messages: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SUBMIT:
      return {
        ...state,
        member: { username: action.payload, id: Math.random() + 7 },
      };
    case HANDLE_USERNAME:
      return { ...state, valueSignIn: action.payload };
    case HANDLE_MSG:
      return { ...state, text: action.payload };
    case CLEAR_MSG:
      return { ...state, text: initialState.text };
    case PUSH_MSG:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}
