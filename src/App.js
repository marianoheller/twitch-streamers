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

  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-7-24"></div>
          <div className="pure-u-10-24">
            <Header setFilter={this.setFilter.bind(this)}></Header>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-7-24"></div>
          <div className="pure-u-10-24">
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

  render() {
    return (
      <div className="App-header">
        <div className="pure-g">
          <div className="pure-u-5-24"></div>
          <div className="pure-u-14-24">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1280px-Twitch_logo.svg.png" className="App-logo" alt="logo" />
          </div>
          <div className="pure-u-5-24">
            <button className="pure-button" onClick={this.handleClick.bind(this)} value="All">All</button>
            <button className="pure-button" onClick={this.handleClick.bind(this)} value="Online">Online</button>
            <button className="pure-button" onClick={this.handleClick.bind(this)} value="Offline">Offline</button>
          </div>
        </div>
      </div>
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

    console.log(arrStreamer);

    return(
      <table className="pure-table pure-table-horizontal">
        <tbody>
          {arrStreamer}
        </tbody>
      </table>
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
    const logo = data.stream ? data.stream.logo : "http://lorempixel.com/100/100/?param="+Math.floor(Math.random()*100);
    const displayName = data.stream ? data.stream.display_name : data.display_name;
    let status = data.stream ? data.stream.status : "Offline";
    const classStatus = data.stream ? "Online" : "Offline";
    if ( status.length > 0 ) {
      status = status.substr(0,60);
    }


    return (
        <tr onClick={ () => { this.handleOnStreamerClick(url) } } className="hvr-fade">
          <td><img src={logo} className="logo" /></td>
          <td>{displayName}</td>
          <td className={classStatus}>{status}</td>
        </tr>
      );
  }
}

export default App;
