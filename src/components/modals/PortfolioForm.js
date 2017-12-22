import React from 'react';
import {
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar
 } from 'react-bootstrap';

const PortfolioForm = ({
  showForm,
  close,
  open,
  onSubmitForm
}) =>{

  let textInput;
  return (
    <Modal
      show={showForm}
      onHide={close}
      backdrop={false}
      dialogClassName="portfolio-form-modal"
      >
      <Modal.Body>
        <Form inline>
          <FormGroup controlId="portfolio">
            <FormControl inputRef={input => textInput = input} type="text" placeholder="Enter portfolio name" />
          </FormGroup>
            {' '}
          <ButtonToolbar>
            <Button
              bsStyle="success"
              bsSize="xsmall"
              onClick={() => onSubmitForm(textInput.value)}
            >
              Send
            </Button>
            {' '}
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={() => close()}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PortfolioForm;
