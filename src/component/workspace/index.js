import Botlang from 'botlang';
import ElizaScriptLocation from './eliza.bot';
import React from 'react';

import './index.css';

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      code: '',
      message: ''
    };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(ElizaScriptLocation)
      .then(response => response.text())
      .then(response => {
        this.setState({ code: response });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const bot = new Botlang(this.state.code),
          answer = bot.reply(this.state.message);

    this.setState({ answer });
  }

  render() {
    return (
      <div className="Workspace">
        <textarea
          cols="80"
          rows="40"
          onChange={this.handleCodeChange}
          value={this.state.code}
        />
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.answer}</p>
          <br />
          <input
            onChange={this.handleMessageChange}
            placeholder="Type something ..."
            type="text"
            value={this.state.message}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
