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
    this.getProfile = this.getProfile.bind(this);
    this.renderAlerts = this.renderAlerts.bind(this);
    this.update = this.update.bind(this);
  }

  async getProfile() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://localhost:5000/profile", {
      headers: {
        authorization: "Bearer " + token
      }
    });
    if (response.status === 200) {
      const profile = response.data;
      return profile;
    } else {
      // handle others
    }
  }

  async update(user: User) {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      "http://localhost:5000/update_profile",
      {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        profile_picture_url: user.profilePictureURL
      },
      {
        headers: {
          authorization: "Bearer " + token
        }
      }
    );
    if (response.status === 200) {
      this.setState({
        alerts: [{ type: "success", message: "Profile updated successfully" }]
      });
    } else {
      //TODO: handle others
      this.setState({
        alerts: [{ type: "danger", message: "Profile failed to update" }]
      });
    }
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
          <Profile update={this.update} getProfile={this.getProfile} />
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
