import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import FormSUR from "Components/FormSUR/FormSUR";
import { userForm } from "Containers/Configurations/forms";
import { addPage } from "Connection/diaries";

export default class AddPage extends Component {
  render() {
    return (
      <Container style={{ margin: "2rem" }}>
        <FormSUR formConfig={userForm} mode="create" submitAsync={addPage} />
      </Container>
    );
  }
}
