import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MenuBarSUR from "Components/MenuSUR/MenuBarSUR";
import MenuContentSUR from "Components/MenuSUR/MenuContentSUR";
import DiaryList from "../DiaryList";
import AddPage from "../AddPage";
import { signOut } from "Connection/authentication";

const menuBarConfig = [
  {
    endpoint: "/entries",
    display: "Diary"
  },
  {
    endpoint: "/addEntries",
    display: "Add Entry"
  }
];

const menuContentConfig = [
  {
    endpoint: "/",
    exact: true,
    component: DiaryList
  },
  {
    endpoint: "/entries",
    exact: true,
    component: DiaryList
  },
  {
    endpoint: "/addEntries",
    exact: true,
    component: AddPage
  }
];

export default class MenuRouter extends Component {
  render() {
    return (
      <Container>
        <MenuBarSUR
          menuConfig={menuBarConfig}
          link={Link}
          userName={this.props.user.email}
          handleLogout={handleLogout}
        />
        <MenuContentSUR contentConfig={menuContentConfig} />
      </Container>
    );
  }
}

// Internals
function handleLogout() {
  signOut().then(status => console.info(status));
}
