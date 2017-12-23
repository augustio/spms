import React, { Component } from 'react';

class NewPortfolioForm extends Component{

  state = {name: "", error: ""};

  handleInputChange = event => {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  handleSubmit = () => {
    if(this.state.name){
      let name = this.state.name.trim()
      let exists = this.props.portfolios.find(p => p.name === name);
      if(exists){
        this.setState({error: "No duplicate portfolio names!"});
      }else{
        this.props.onSubmit(this.state.name);
        this.props.close();
      }
    }else{
      this.setState({error: "You must provide portfolio name!"});
    }
  }

  render(){
    return (
      <form className="col s9">
        <div className="row">
          <div className="col s6">
            <input placeholder="Portfolio Name" id="name" type="text" className="validate" value={this.state.name} onChange={this.handleInputChange}/>
            <label style={{color: "red"}}>{this.state.error}</label>
          </div>
          <div className="col s2">
            <a
              className="btn-floating btn waves-effect waves-light teal darken-2"
              onClick={this.handleSubmit}>
              <i className="material-icons">add</i>
            </a>
          </div>
          <div className="col s2">
            <a
              className="btn-floating btn waves-effect waves-light red darken-2"
              onClick={() => this.props.close()}>
              <i className="material-icons">cancel</i>
            </a>
          </div>
        </div>
      </form>
    );
  }
};

export default NewPortfolioForm;
