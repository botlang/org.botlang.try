import React, { Component } from 'react';
import Workspace from './../workspace';

import './index.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Try Botlang - Online REPL</h2>
        </div>
        <br />
        <Workspace />
      </div>
    );
  }
}
