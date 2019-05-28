import React from "react";
import "./App.css";
import Login from "./Login";

import axios from "axios";
import Profile from "./Profile";
import { Alert } from "react-bootstrap";

type Props = {};

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
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.renderAlerts = this.renderAlerts.bind(this);
    this.update = this.update.bind(this);
  }

  async login(username: string, password: string) {
    try {

    const response = await axios.post("http://localhost:5000/login", {
      username,
      password
    });
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.token);
      this.setState({
        authenticated: true,
        alerts: [{ type: "success", message: "Logged in successfully" }]
      });
    } else {
      // handle others
      this.setState({
        alerts: [{ type: "danger", message: "Invalid username/password" }]
      });
    }
  } catch (err){
    this.setState({
      alerts: [{ type: "danger", message: "Invalid username/password" }]
    });
  }

   
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
        {this.state.authenticated ? (
          <Profile update={this.update} getProfile={this.getProfile} />
        ) : (
          <Login login={this.login} />
        )}
      </div>
    );
  }
}

export default App;
