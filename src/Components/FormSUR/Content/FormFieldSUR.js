import React from "react";
import { Form } from "semantic-ui-react";

// > Props:
/*
    fieldConfig: configuration of the field ({key, label, placeholder, type, defaultvalue?, options?, isRequired?, isVertical?})
    values: model object of form values
    handleInput: handle inputs from "onChange"
*/

export default function FormFieldSUR({ fieldConfig, values, handleInput }) {
  return (
    <Form.Field>{inputComponent(fieldConfig, values, handleInput)}</Form.Field>
  );
}

// > Internals

function inputComponent(fieldConfig, values, handleInput) {
  switch (fieldConfig.type) {
    case "input":
      return (
        <Form.Input
          required={fieldConfig.isRequired}
          fluid
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder}
          name={fieldConfig.key}
          value={values[fieldConfig.key] || ""}
          onChange={e => handleInput(e, e.target)}
        />
      );
    case "select":
      return (
        <Form.Select
          required={fieldConfig.isRequired}
          fluid
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder}
          name={fieldConfig.key}
          value={values[fieldConfig.key] || ""}
          onChange={e => handleInput(e, e.target)}
          options={fieldConfig.options || []}
        />
      );
    case "textArea":
      return (
        <Form.TextArea
          required={fieldConfig.isRequired}
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder}
          name={fieldConfig.key}
          value={values[fieldConfig.key] || ""}
          onChange={e => handleInput(e, e.target)}
        />
      );
    case "radio":
      const options = fieldConfig.options || [];
      return (
        <Form.Group
          grouped={fieldConfig.isVertical}
          inline={!fieldConfig.isVertical}
        >
          <Form.Field required={fieldConfig.isRequired}>
            <label required>{fieldConfig.label}</label>
          </Form.Field>
          {options.map(option => (
            <Form.Radio
              key={option.key}
              label={option.text}
              name={fieldConfig.key}
              value={option.value}
              checked={option.value === values[fieldConfig.key]}
              onChange={(e, value) => handleInput(e, value)}
            />
          ))}
        </Form.Group>
      );
    case "checkbox":
      return (
        <Form.Checkbox
          required={fieldConfig.isRequired}
          label={fieldConfig.label}
          name={fieldConfig.key}
          checked={!!values[fieldConfig.key]}
          onChange={(e, value) =>
            handleInput(e, { name: value.name, value: value.checked })
          }
        />
      );
    default:
      return <div>N/A</div>;
  }
}
