import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Icon, Grid } from "semantic-ui-react";
import { onAuthChange } from "Connection/authentication";
import Login from "Containers/Login";
import MenuRouter from "Containers/Routes/MenuRouter";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    onAuthChange(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <MainHeader />
          {/* Authenticated */}
          {this.state.user && <MenuRouter user={this.state.user} />}
          {/* Not authenticated */}
          {!this.state.user && <Login />}
        </Container>
      </div>
    );
  }
}

function MainHeader() {
  return (
    <div className="App">
      <Container>
        <br />
        <br />
        <br />
        <Grid padded textAlign="center" verticalAlign="middle">
          <Header color={"teal"} as="h2">
            <Icon name="cog" />
            <Header.Content>Circle Diary</Header.Content>
          </Header>
        </Grid>
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}
