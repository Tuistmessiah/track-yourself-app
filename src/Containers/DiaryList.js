import React, { Component, useState } from "react";
import {
  Accordion,
  Grid,
  Container,
  Icon,
  Button,
  Modal,
  Header
} from "semantic-ui-react";
import { onGetPages, deletePage } from "Connection/diaries";
import FormSUR from "Components/FormSUR/FormSUR";
import { userForm } from "Containers/Configurations/forms";
import { editPage } from "Connection/diaries";

export default class DiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      pages: null,
      modalOpen: false,
      selectedPage: null
    };
  }

  componentDidMount() {
    onGetPages(pages => {
      this.setState({ pages });
    });
  }

  toggleModal = page => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      selectedPage: page
    }));
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    if (!this.state.pages) {
      return (
        <div>
          <div style={{ textAlign: "center", padding: "7rem 0" }}>
            <Icon loading={true} size="huge" name="spinner" />
          </div>
        </div>
      );
    }

    if (this.state.pages.length === 0) {
      return (
        <div>
          <div style={{ textAlign: "center", padding: "7rem 0" }}>
            <Header as="h2" icon>
              <Icon size="huge" name="edit outline" />
              No Diary Entries
              <Header.Subheader>
                Add a new entry and change it whenever you like :)
              </Header.Subheader>
            </Header>
          </div>
        </div>
      );
    }

    return (
      <Container>
        <Grid padded columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>Title</Grid.Column>
            <Grid.Column width={5}>Date</Grid.Column>
          </Grid.Row>
        </Grid>
        <Accordion fluid styled>
          {this.state.pages.map((page, index) => (
            <div key={index}>
              <Accordion.Title
                active={this.state.activeIndex === index}
                index={index}
                onClick={this.handleClick}
              >
                <Grid columns={3} divided>
                  <Grid.Row>
                    <Grid.Column width={8}>{page.title}</Grid.Column>
                    <Grid.Column width={5}>{page.date}</Grid.Column>
                    <Grid.Column width={3}>
                      <Button onClick={() => this.toggleModal(page)}>
                        Edit
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === index}>
                <Button
                  floated="right"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ activeIndex: -1 });
                    deletePage(page.id);
                  }}
                >
                  X
                </Button>
                <p>{page.content}</p>
              </Accordion.Content>
            </div>
          ))}
        </Accordion>

        {this.state.selectedPage && (
          <ModalSemantic
            page={this.state.selectedPage}
            open={this.state.modalOpen}
            handleClose={this.handleClose}
          />
        )}
      </Container>
    );
  }
}

function ModalSemantic({ page, open, handleClose }) {
  return (
    <Modal open={!!(open && page)} onClose={handleClose}>
      <Modal.Content>
        <Modal.Description>
          <FormSUR
            id={page.id}
            values={page}
            mode="edit"
            formConfig={userForm}
            submitAsync={editPage}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions />
    </Modal>
  );
}
