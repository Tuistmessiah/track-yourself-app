import React, { Component } from "react";
// Components
import { Menu, Container, Label } from "semantic-ui-react";

// - Props:
/*
    menuConfig: configuration for the menu buttons (array of { endpoint, display })
        "endpoint": string of the endpoint (E.g: "entries" that will be "URL/entries")
        "display": string that will appear in the menu button
    link: the component that will change the endpoint (using react-router's Link). 
        A <Router /> component should wrap this somewhere above
    userName: identification of the user to display (name, email, etc)
    handleLogout: function to handle logout
*/

export default class MenuBarSUR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Container>
        <Menu>
          {this.props.menuConfig.map(itemConfig => (
            <Menu.Item
              key={itemConfig.endpoint}
              as={this.props.link}
              to={itemConfig.endpoint}
              name={itemConfig.endpoint}
              active={this.state.activeItem === itemConfig.endpoint}
              onClick={this.handleItemClick}
            >
              {itemConfig.display}
            </Menu.Item>
          ))}

          <Menu.Menu position="right">
            <Menu.Item>
              <Label>{this.props.userName}</Label>
            </Menu.Item>
            <Menu.Item name="logout" onClick={this.props.handleLogout} />
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}
