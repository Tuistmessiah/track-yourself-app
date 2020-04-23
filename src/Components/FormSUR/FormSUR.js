import React, { Component } from "react";
import { Container, Form, Header, Icon, Button } from "semantic-ui-react";
import FormFieldSUR from "./Content/FormFieldSUR";
import MessageSUR from "./Content/MessageSUR";

// > Types

// - State:
/*
  values: filled from props.values
  mode: filled from props.mode
  status: 
    code: Defines the message that appears, enum: "normal", "success", "error", "failure", "isSubmitting"
    message: Written text message content
*/

// - Props:
/*
  id: id of the object in case it is being edited (so, only used in "edit" mode)
  values: model to prefill the form
  formConfig: array of array of objects to configure field inputs in form
  mode: mode either enabling or disabling user input OR updating or creating anew an entry
  submit: parent function that will receive form result
  submitAsync: parent async function that will receive form result
    Note: Both submits are a function with arguments: (object, id)

  - values:
  Just used in case it is "edit" or "view". The values that already prefill the form
  - formConfig:
  ALL: type enum: input, select, radio, checkbox, textArea, date, select-autocomplete, checkbox-multi, input-control-type
  ALL: defaultValue
  ALL: key
  (select, radio, checkbox): options ({ value, display })
  - mode:
  enum: "edit", "create", "view"
  - submit/submitAsync
  Either pass one or the other, depending if it is sync or async.
*/

// > TODOS

// TODO: do other "types" in formConfig
// TODO: Remove comments with proper typescript

export default class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values || {},
      mode: props.mode,
      status: { code: "normal", message: null }
    };
  }

  // > Render

  render() {
    if (this.props.formConfig.length === 0) {
      return (
        <Container>
          {/* No Form */}
          <div style={{ textAlign: "center", padding: "7rem 0" }}>
            <Header as="h2" icon>
              <Icon size="huge" name="edit outline" />
              No form available!
            </Header>
          </div>
        </Container>
      );
    }

    return (
      <Container>
        {/* Form */}
        <Form onSubmit={this.onFormSubmit}>
          {this.props.formConfig.map((groupConfig, groupIndex) => (
            <Form.Group widths="equal" key={groupIndex}>
              {groupConfig.map((fieldConfig, fieldIndex) => (
                <Form.Field
                  key={fieldIndex}
                  disabled={this.props.mode === "view"}
                >
                  <FormFieldSUR
                    handleInput={this.handleInput}
                    fieldConfig={fieldConfig}
                    values={this.state.values}
                  />
                </Form.Field>
              ))}
            </Form.Group>
          ))}

          {/* Message Popup */}
          <MessageSUR
            status={this.state.status}
            setStateStatus={this.setStateStatus}
          />

          {/* Submit Button */}
          {this.props.mode !== "view" && (
            <div>
              <Button
                type={"submit"}
                floated={"left"}
                disabled={this.state.status.code === "isSubmitting"}
                loading={this.state.status.code === "isSubmitting"}
              >
                Submit {this.props.mode === "edit" ? "changes" : ""}
              </Button>
            </div>
          )}
        </Form>
      </Container>
    );
  }

  // > Methods

  handleInput = (e, { name, value }) => {
    e.preventDefault();
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  onFormSubmit = e => {
    e.preventDefault();
    // Validate
    if (!validateForm(this.props.formConfig, this.state.values)) {
      this.setStateStatus("failure", "Fill all required fields!");
      return;
    }
    // Sync
    if (this.props.submit) {
      this.props.submit({ ...this.state.values }, this.props.id);
      // TODO: Do some kind of reset here
      // Async
    } else {
      this.props
        .submitAsync(this.state.values, this.props.id)
        .then(async resp => {
          console.info(resp);
          await this.setStateStatus("isSubmitting");
          this.setStateStatus("success", "Submitted!");
        })
        .catch(error => {
          console.info(error);
          this.setStateStatus("error", "Something went wrong!");
        });
    }
  };

  setStateStatus = (code, message) => {
    this.setState({ status: { code, message } });
  };
}

// > Props

FormContainer.defaultProps = {
  values: {},
  id: null,
  formConfig: [],
  mode: "edit",
  submitAsync: async function() {
    console.error("No onFormSubmit defined for this form!");
  }
};

// > Internals

function validateForm(formConfig, values) {
  for (const groupConfig of formConfig) {
    for (const fieldConfig of groupConfig) {
      if (fieldConfig.isRequired && !values[fieldConfig.key]) {
        return false;
      }
    }
  }
  return true;
}
