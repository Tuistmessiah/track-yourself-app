import React, { Fragment } from "react";
import { Message, Label, Transition } from "semantic-ui-react";

// > Props:

/*
    status: status of the parent container ({ code message})
    setStateStatus: function to change the status (args: (code, message))
*/

// > Types
/*
    status: 
        code: Defines the message that appears, enum: "normal", "success", "error", "failure", "isSubmitting"
        message: Written text message content
*/

const codeList = {
  success: "Success",
  failure: "Failure",
  error: "Error"
};

export default function MessageSUR({ status, setStateStatus }) {
  if (!Object.keys(codeList).includes(status.code)) {
    return <Fragment />;
  }

  return (
    <Message
      onDismiss={() => setStateStatus("normal")}
      visible
      positive={status.code === "success"}
      warning={status.code === "failure"}
      negative={status.code === "error"}
      header={messageText(codeList, status.code)}
      content={status.message || ""}
    />
  );
}

// > Internals

function messageText(codeList, code) {
  return codeList[code] || "";
}
