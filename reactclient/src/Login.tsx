import React from "react";
import "./App.css";

import { Form, Button } from "react-bootstrap";

type Props = {
  login: (username: string, password: string) => void;
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
              this.props.login(this.state.username, this.state.password);
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

export default Login;
