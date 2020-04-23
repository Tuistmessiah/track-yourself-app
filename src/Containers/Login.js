import React, { Component } from "react";
// Components
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Container
} from "semantic-ui-react";
// Connection
import { signIn, createUser } from "Connection/authentication";

// > IMPLEMENTATION

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",

      isSignUp: false,
      status: null
    };
  }

  changeMode = e => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleDismiss = () => {
    this.setState({ status: null });
  };

  onFormSubmit = async () => {
    this.setState({ status: null });
    if (this.state.isSignUp) {
      await createUser(this.state.username, this.state.password).then(
        status => {
          if (status) {
            this.setState({
              status: null,
              username: "",
              password: ""
            });
          } else {
            this.setState({ status: "failure" });
          }
        }
      );
    } else {
      signIn(this.state.username, this.state.password).then(status => {
        if (status) {
          this.setState({
            status: null,
            username: "",
            password: ""
          });
        } else {
          this.setState({ status: "failure" });
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <br />
        <Grid.Row></Grid.Row>
        <Grid padded textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large" onSubmit={this.onFormSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="username"
                    value={this.state.username}
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    value={this.state.password}
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />

                  <Button color="teal" fluid size="large">
                    {this.state.isSignUp ? "SignUp" : "Login"}
                  </Button>
                </Segment>
              </Form>
              <Message>
                Change to:{" "}
                <button href="#" onClick={this.changeMode}>
                  {this.state.isSignUp ? "Login" : "SignUp"}
                </button>
              </Message>
              {this.state.status === "failure" && (
                <Message
                  onDismiss={this.handleDismiss}
                  negative
                  header="There was some errors with your submission"
                  content="No valid email address, weak password or already exists!"
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
