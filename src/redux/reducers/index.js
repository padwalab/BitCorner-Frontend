import * as actions from "../actions/action-types";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        users: [...state.users, action.payload.content],
        currentUser: {},
        isLoggedIn: false,
      };
    case actions.LOG_IN:
      return {
        ...state,
        currentUser: action.payload.content,
        isLoggedIn: true,
      };
    case actions.LOG_OUT:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
