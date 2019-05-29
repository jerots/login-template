import { combineReducers } from "redux";
import { Alert } from "../types";

export type AppState = {
  authenticated: boolean;
  alerts: Alert[];
};

function authenticated(state = false, action: { type: string }) {
  switch (action.type) {
    case "LOGGED_IN":
      return true;
    case "LOGGED_OUT":
      return false;
    default:
      const accessToken = localStorage.getItem("access_token");
      // TODO: verify token validity
      if (accessToken) {
        return true;
      } else {
        return false;
      }
  }
}

function alerts(state = [], action: { type: string; payload: [] }) {
  switch (action.type) {
    case "ADD_ALERTS_FRESH":
      return action.payload;
    case "ADD_ALERTS":
      return state.concat(action.payload);
    case "CLEAR_ALERTS":
      return [];
    default:
      return state;
  }
}

export const combinedReducer = combineReducers({ authenticated, alerts });
