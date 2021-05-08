import * as actions from "../actions/action-types";

const initialState = {
  // currentUser: {
  //   name: "Abhijeet Padwal",
  //   email: "a@a.com",
  //   password: "a",
  //   nickName: "duh",
  // },
  // isLoggedIn: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      };
    case actions.LOG_IN:
      return {
        ...state,
        currentUser: action.payload.content,
        isLoggedIn: true,
      };
    case actions.UPDATE_PROFILE:
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
