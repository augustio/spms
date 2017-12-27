import React, { Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

class NewPortfolioForm extends Component{

  state = {
    value: "",
    showForm: false,
    createNewPortfolio: true,
    error: ""
  };

  errorMsg = {
    empty: "You must provide a name",
    duplicate: "No duplicate names"
  };

  close = () => this.setState({
    showForm: false,
    createPortfolio: true,
    value: "",
    error: ""
  });

  open = () => this.setState({showForm: true});

  getValidationState = () => {
    if(this.state.error){
      return 'error';
    }
  };

  handleChange = e =>{
    let error = "";
    let value = e.target.value.trim();
    if(this.props.portfolios.find(p => p.name === value)){
      error = this.errorMsg.duplicate;
    }
    if(!value){
      error = this.errorMsg.empty;
    }
    this.setState({value, error});
  }

  IsValid(){
    if(!this.state.value){
      this.setState({error: this.errorMsg.empty});
      return false;
    }
    if(this.state.error){
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if(this.IsValid()){
      this.props.onSubmit(this.state.value);
      this.close();
    }
  }

  onAddPortfolioBtnClick = () =>{
    //Max portfolios = 10
    if(this.props.portfolios.length === 10){
      this.setState({createNewPortfolio: false});
      this.timeoutId = setTimeout(
        () => this.setState({createNewPortfolio: true}),
        2000
      );
    }else{
      this.open();
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }

  render(){
    return(
      <div>
        <Button
          bsSize="xsmall"
          bsStyle="primary"
          onClick={this.onAddPortfolioBtnClick}
        >
          Add New Portfolio
          &nbsp;
          <i className="fa fa-plus"></i>
        </Button>
        {
          this.state.createNewPortfolio ?
          "" :
          <span style={{color:"red"}}>Max number of portfolios is 10</span>
        }
        <Modal
          show={this.state.showForm}
          onHide={this.close}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>New Portfolio Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="pForm"
                validationState={this.getValidationState()}
              >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter Portfolio Name"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.error}</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={() => this.handleSubmit()}>
              Submit
              &nbsp;
              <i className="fa fa-check-square-o"></i>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default NewPortfolioForm;
