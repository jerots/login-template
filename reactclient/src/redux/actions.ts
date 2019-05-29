import { Alert } from "./types";

export const login = (isLoggedIn: boolean) => ({
  type: isLoggedIn ? "LOGGED_IN" : "LOGGED_OUT"
});

export const addAlerts = (alerts: Alert[]) => ({
  type: "ADD_ALERTS",
  payload: alerts
});

export const addAlertsFresh = (alerts: Alert[]) => ({
  type: "ADD_ALERTS_FRESH",
  payload: alerts
});

export const clearAlerts = () => ({
  type: "CLEAR_ALERTS"
});
