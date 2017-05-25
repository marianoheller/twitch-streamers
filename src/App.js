import React, { Component } from 'react';
import './App.css';
import myData from './data.json';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: "All"
    }

  }

  setFilter(val) {
    this.setState( {
      ...this.state, 
      filter: val
    });
  }

  getFilter() {
    return this.state.filter;
  }

  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-0 pure-u-sm-2-24 pure-u-md-4-24 pure-u-lg-4-24"></div>
          <div className="pure-u-1 pure-u-sm-20-24 pure-u-md-16-24 pure-u-lg-16-24">
            <Header getFilter={this.getFilter.bind(this)} setFilter={this.setFilter.bind(this)}></Header>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-0 pure-u-sm-2-24 pure-u-md-4-24 pure-u-lg-4-24"></div>
          <div className="pure-u-1 pure-u-sm-20-24 pure-u-md-16-24 pure-u-lg-16-24">
            <StreamerList filter={this.state.filter}></StreamerList>
          </div>
        </div>
      </div>
    );
  }
}

class Header extends Component {


  handleClick (e) {

    e.persist();

    this.props.setFilter(e.target.value);
  }

  handleHover( e ) {
    e.persist();
  }

  render() {
    return (
      <div className="App-header">
        <div className="pure-g">
          <div className="pure-u-5-24"></div>
          <div className="pure-u-14-24">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1280px-Twitch_logo.svg.png" className="App-logo" alt="logo" />
            <h2 id="Title">Streamers Watch</h2>
          </div>
          <div className="pure-u-5-24">
            <div className="buttonContainer">
              <Button filter={this.props.getFilter()} onClick={this.handleClick.bind(this)} value="All"></Button>
              <Button filter={this.props.getFilter()} onClick={this.handleClick.bind(this)} value="Online"></Button>
              <Button filter={this.props.getFilter()} onClick={this.handleClick.bind(this)} value="Offline"></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Button extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.filter === this.props.value ? true : false,
      fakeSelected: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      ...this.state,
      selected: nextProps.filter === nextProps.value ? true : false,
    }
  }

  isSelected() {
    return this.state.selected || this.state.fakeSelected ? "selected" : "";
  }

  handleHover(hovered,e) {
    this.setState( {
        ...this.state,
        fakeSelected: hovered
        });
    
  }


  getText() {
    return this.state.selected || this.state.fakeSelected ? this.props.value : "";
  }

  render() {
    return (
      <button onMouseOut={this.handleHover.bind(this,false)} onMouseOver={this.handleHover.bind(this,true)} className={"pure-button "+this.isSelected()} onClick={this.props.onClick} value={this.props.value}>
        <div className={`placeholder placeholder-${this.props.value}`}></div>
        {" "+this.getText()}
      </button>
    )
  }
}

class StreamerList extends Component {
  render() {

    const arrStreamer = myData.filter( (e) => {
      if ( e.hasOwnProperty("error") )  {
        return false;
      }
      if ( this.props.filter === "Online" && !e.stream ) {
        return false;
      }
      if ( this.props.filter === "Offline" && e.stream ) {
        return false;
      }
      return true;
    }).map( (e, i) => {
      return <Streamer key={i} data={e}> </Streamer>
    })


    return(
      <div className="tableContainer">
        <table className="pure-table pure-table-horizontal">
          <tbody>
            {arrStreamer}
          </tbody>
        </table>
      </div>
    )
  }
}

class Streamer extends Component {


  handleOnStreamerClick(url) {
    if ( url ) {
      window.location.href = url;
    }
  }

  render() {
    const { data } = this.props;


    const url = data.stream ? data.stream.url : "";
    const logo = data.stream ? data.stream.logo : "https://lorempixel.com/50/50/?param="+Math.floor(Math.random()*100);
    const displayName = data.stream ? data.stream.display_name : data.display_name;
    let status = data.stream ? data.stream.status : "Offline";
    const classStatus = data.stream ? "Online" : "Offline";
    if ( status.length > 0 ) {
      status = status.substr(0,60);
    }


    return (
        <tr onClick={ () => { this.handleOnStreamerClick(url) } } className="hvr-fade">
          <td><img src={logo} className="logo" alt="channelLogo"/></td>
          <td>{displayName}</td>
          <td className={classStatus}>{status}</td>
        </tr>
      );
  }
}

export default App;
