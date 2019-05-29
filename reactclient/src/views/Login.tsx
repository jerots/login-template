import React from "react";

import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { login, addAlertsFresh } from "../redux/actions";
import { Alert } from "../redux/types";

type Props = {
  login: (isLoggedIn: boolean) => void;
  addAlertsFresh: (alerts: Alert[]) => void;
};

type State = {
  username: string;
  password: string;
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  async login(username: string, password: string) {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password
      });
      console.log(response);
      if (response && response.status === 200) {
        localStorage.setItem("access_token", response.data.token);
        this.props.login(true);
        this.props.addAlertsFresh([
          {
            type: "success",
            message: "Logged in successfully"
          }
        ]);
      } else {
        // handle others
        this.props.addAlertsFresh([
          {
            type: "danger",
            message: "Invalid username/password"
          }
        ]);
      }
    } catch (err) {
      this.props.addAlertsFresh([
        {
          type: "danger",
          message: "Invalid username/password"
        }
      ]);
    }
  }

  handleUsernameChange(event: any) {
    const newValue = event.target.value;

    this.setState({ username: newValue });
  }

  handlePasswordChange(event: any) {
    const newValue = event.target.value;

    this.setState({ password: newValue });
  }

  render() {
    return (
      <div style={styles.container}>
        <Form style={styles.form}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
            />
            <Form.Text className="text-muted" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              this.login(this.state.username, this.state.password);
            }}
          >
            Submit
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

export default connect(
  null,
  { login, addAlertsFresh }
)(Login);
