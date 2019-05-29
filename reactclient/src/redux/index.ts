import { createStore } from "redux";
import { combinedReducer } from "./reducers/combinedReducer";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(combinedReducer);
