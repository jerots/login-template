import React from "react";

import { Form, Button } from "react-bootstrap";
import { User } from "../App";
import axios from "axios";

type Props = {
};

type State = {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureURL: string;
};

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      profilePictureURL: ""
    };
  }

  async componentWillMount() {
    const {
      first_name,
      last_name,
      email,
      profile_picture_url
    } = await this.getProfile();
    const profilePictureURL = profile_picture_url || "";
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email,
      profilePictureURL
    });
  }

  handleEmailChange(event: any) {
    const newValue = event.target.value;

    this.setState({ email: newValue });
  }

  handleFirstNameChange(event: any) {
    const newValue = event.target.value;

    this.setState({ firstName: newValue });
  }
  handleLastNameChange(event: any) {
    const newValue = event.target.value;

    this.setState({ lastName: newValue });
  }

  handleProfilePictureURLChange(event: any) {
    const newValue = event.target.value;

    this.setState({ profilePictureURL: newValue });
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
      // this.setState({
      //   alerts: [{ type: "success", message: "Profile updated successfully" }]
      // });
    } else {
      //TODO: handle others
      // this.setState({
      //   alerts: [{ type: "danger", message: "Profile failed to update" }]
      // });
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Form style={styles.form}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange.bind(this)}
            />
            <Form.Text className="text-muted" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange.bind(this)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange.bind(this)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              value={this.state.profilePictureURL}
              onChange={this.handleProfilePictureURLChange.bind(this)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              this.update({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                profilePictureURL: this.state.profilePictureURL
              });
            }}
          >
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100%"
  },
  form: {
    width: 500
  }
};

export default Profile;
