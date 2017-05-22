import React, { Component } from 'react';
import './App.css';
import myData from './data.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-6-24"></div>
          <div className="pure-u-12-24">
            <Header></Header>
            <StreamerList></StreamerList>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1">
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </div>
        
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1280px-Twitch_logo.svg.png" className="App-logo" alt="logo" />
        </div>
      </div>
    )
  }
}

class StreamerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: "All"
    }
  }

  render() {

    const arrStreamer = myData.filter( (e) => {
      if ( e.hasOwnProperty("error") )  {
        return false;
      }
      if ( this.state.filter === "Online" && !e.stream ) {
        return false;
      }
      if ( this.state.filter === "Offline" && e.stream ) {
        return false;
      }
      return true;
    }).map( (e, i) => {
      return <Streamer key={i} data={e}> </Streamer>
    })

    console.log(arrStreamer);

    return(
      <div>
        <ul>
          {arrStreamer}
        </ul>
      </div>
    )
  }
}

class Streamer extends Component {
  render() {
    const { data } = this.props;

    const status = data.stream ? "Online" : "Offline";



    return (
      <li>{status}</li>
    )
  }
}

export default App;
