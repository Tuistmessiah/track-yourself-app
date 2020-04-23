export const userForm = [
  [
    {
      key: "title",
      label: "Title",
      defaultValue: "",
      placeholder: "Keywords of the day...",
      type: "input",
      isRequired: true
    },

    {
      key: "date",
      label: "Date",
      defaultValue: "",
      placeholder: "When...",
      type: "select"
    }
  ],
  [
    {
      key: "content",
      label: "Diary passage",
      defaultValue: "",
      placeholder: "Your day...",
      type: "textArea",
      isRequired: true
    }
  ],
  [
    {
      key: "date2",
      label: "Date2",
      defaultValue: "",
      placeholder: "When2...",
      type: "select"
    }
  ],
  [
    {
      key: "muraal",
      label: "Welke?",
      defaultValue: "extra",
      placeholder: "Your day...",
      type: "radio",
      options: [
        { key: "extra", text: "Extra", value: "extra" },
        { key: "intra", text: "Intra", value: "intra" }
      ],
      isVertical: true
    },
    {
      key: "important",
      label: "Belangrijk?",
      defaultValue: false,
      type: "checkbox"
    }
  ],
  [
    {
      key: "gender",
      label: "What is jouw gender, biatch?",
      defaultValue: "",
      type: "radio",
      options: [
        { key: "male", text: "I am a MAN!", value: "male" },
        { key: "female", text: "I am a WOMAAAN!", value: "female" }
      ],
      isVertical: true
    }
  ]
];

// > Structure

// form: [
//     [{}, {}],
//     [{}, {}],
// ]
