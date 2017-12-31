import React, { Component } from 'react';
import {
  Modal,
  Button,
  Checkbox,
  Col
} from 'react-bootstrap';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { LineChart } from 'react-easy-chart';

class PerformanceGraph extends Component{
  constructor(props){
    super(props)
    moment.locale('en');
    momentLocalizer();
  }

  state = {
    showGraph: false,
    maxDate: new Date(),
    minDate: new Date(1970, 1, 1),
    from: new Date(1970, 1, 1),
    to: new Date()
  };

  symbols = {};

  data = {};

  componentDidMount(){
    this.props.stocks.map(s =>
    this.symbols[s.symbol] = {selected: false, symbol: s.symbol});
  }

  close = () => {
    this.setState({
      showGraph: false
    });
  }

  open = () => {
    this.setState({showGraph: true});
    this.props.stocks.forEach(s => {
      this.props.getPerfData(s.symbol, s.pId);
    });
    this.props.stocks.map(s =>
    this.symbols[s.symbol] = {selected: false, symbol: s.symbol});
  };

  getGraphData(){
    let data = {};
    let dates = [];
    let from = Math.floor(this.state.from.getTime()/1000);
    let to = Math.floor(this.state.to.getTime()/1000);
    this.props.stocks.forEach(s => {
      if(this.symbols[s.symbol].selected){
        this.props.getPerfData(s.symbol, s.pId);
        let filtered = this.props.portfolio[s.symbol].filter(d =>{
          let key = Object.keys(d)[0];
          dates.push(key);
          return (key >= from && key <= to);
        });
        data[s.symbol] = filtered.map((d,i) =>{
          let value = Object.values(d)[0];
          return {x: i, y: Number.parseFloat(value)};
        });
      }
    });
    dates = [...new Set(dates.sort())];
    let min = moment.unix(dates[0]).toDate();
    let max = moment.unix(dates[dates.length - 1]).toDate();
    this.setState({
      minDate: min,
      maxDate: max
    });
    this.data =  data;
  }

  renderChart(){
    let keys = Object.keys(this.data) || [];
    if(keys.length > 0){
      let data = keys.map(k => this.data[k]);
      return (
        <LineChart
          axes
          width={400}
          height={300}
          interpolate={'cardinal'}
          grid
          verticalGrid
          data={data}
        />
      );
    }else{
      return "";
    }
  }

  renderStockSymbols(){
    return this.props.stocks.map((s) =>{
      return (
        <Checkbox
          key={s.id}
          name={s.symbol}
          defaultChecked={false}
          onChange={e => {
            this.symbols[e.target.name].selected = e.target.checked;
            this.getGraphData();
          }}
        >
          {s.symbol}
        </Checkbox>
      );
    });
  }

  render(){
    return(
      <span>
        <Button
          className="pull-left"
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.open}
        >
          Perf Graph
          &nbsp;
          <i className="fa fa-line-chart"></i>
        </Button>
        <Modal
          show={this.state.showGraph}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title} Performance</Modal.Title>
          </Modal.Header>
          <Col lg={2} md={2} sm={2}>
            {this.renderStockSymbols()}
          </Col>
          <Col lg={10} md={10} sm={10}>
            {this.renderChart()}
          </Col>
          <Modal.Footer>
            <Col lg={6} md={6} sm={6}>
              <span>Start Date</span>
              <DateTimePicker
                time={false}
                value={this.state.from}
                onChange={
                  from => {
                    this.setState({from});
                    this.getGraphData();
                  }
                }
                min={this.state.minDate}
                max={this.state.maxDate}
               />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <span>End Date</span>
              <DateTimePicker
                time={false}
                value={this.state.to}
                onChange={
                  to => {
                    this.setState({to});
                    this.getGraphData();
                  }
                }
                min={this.state.minDate}
                max={this.state.maxDate}
               />
            </Col>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};

export default PerformanceGraph;
