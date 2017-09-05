import Botlang from 'botlang';
import ElizaScriptLocation from './eliza.bot';
import Grid from 'material-ui/Grid';
import React from 'react';
import { withStyles } from 'material-ui/styles';

import './index.css';

const styles = {
};

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer       : '',
      conversation : [],
      code         : '',
      codeVisible  : true,
      message      : ''
    };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const messagesEl = document.getElementById('messages');
    messagesEl.scrollTop = messagesEl.scrollHeight + 250;
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
    this.setState({ message : event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if ('' === this.state.message) return;

    const bot = new Botlang(this.state.code),
          answer = bot.reply(this.state.message);

    this.state.conversation.push({
      created : new Date(),
      text    : this.state.message,
      type    : 'user'
    });
    this.state.conversation.push({
      created : new Date(),
      text    : answer,
      type    : 'bot'
    });

    this.setState({
      answer,
      message : ''
    });
  }

  render() {
    const classes = this.props.classes,
          messages = this.state.conversation.map((message, index) =>
            <div className={`message-type-${message.type}`} key={index}>
              <pre>
                <span className='message-type'>{String('     ' + message.type).slice(-5)}: </span>
                <span className='message-text'>{message.text}</span>
              </pre>
            </div>
          );

    return (
      <div className='workspace'>
        {
          this.state.codeVisible
            ? <textarea id='code' onChange={this.handleCodeChange} value={this.state.code} />
            : null
        }
        <div id='messages'>{messages}</div>
        <form onSubmit={this.handleSubmit}>
          <Grid container className={classes.root}>
            <Grid className='no-padding-bottom' item md={9}>
              <input
                onChange={this.handleMessageChange}
                placeholder='Type something ...'
                type='text'
                value={this.state.message}/>
            </Grid>
            <Grid item className='no-padding-bottom' md={3}>
              <input type='submit' value='Send' />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Workspace);
