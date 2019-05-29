import { combineReducers } from "redux";


export type AppState = {
  authenticated: boolean
}

function authenticated(state = false, action: { type: string }) {
  switch (action.type) {
    case "LOGGED_IN":
      return true;
    case "LOGGED_OUT":
      return false;
    default:
      return state;
  }
}

export const combinedReducer = combineReducers({ authenticated });
