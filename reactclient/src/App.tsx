import React from "react";

import Login from "./views/Login";

import axios from "axios";
import Profile from "./views/Profile";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { AppState } from "./redux/reducers/combinedReducer";

type Props = AppState & {

};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureURL: string;
};

type State = {
  authenticated: boolean;
  user: User;
  alerts: {
    type:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info"
      | "dark"
      | "light"
      | undefined;
    message: string;
  }[];
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const token = localStorage.getItem("access_token");
    // TODO: check token validity
    const authenticated = !!token;
    this.state = {
      authenticated,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        profilePictureURL: ""
      },
      alerts: []
    };
    this.renderAlerts = this.renderAlerts.bind(this);
  }

  

  renderAlerts() {
    return (
      <div>
        {this.state.alerts.map((alert, index) => (
          <Alert key={index} variant={alert.type}>
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        {this.renderAlerts()}
        {this.props.authenticated ? (
          <Profile />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { authenticated } = state;
  return { authenticated };
};

export default connect(mapStateToProps, null)(App);
