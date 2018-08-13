import React, {Component} from 'react';

import Contact from './Contact';

class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourName: '',
      yourEmail: '',
      message: '',
      messageStatus: 'not sent'
    };
  }
  updateYourName = e => {
    this.setState({yourName: e.target.value});
  };
  updateYourEmail = e => {
    this.setState({yourEmail: e.target.value});
  };
  updateMessage = e => {
    this.setState({message: e.target.value});
  };
  sendButtonPressed = () => {
    this.setState({messageStatus: 'sending'});
  };
  submissionStatusHandler = req => {
    if (req.status === 200) {
      this.setState({messageStatus: 'sent'});
    }
    else {
      this.setState({messageStatus: 'failed'},() => {
        setTimeout(() => {
          this.setState({messageStatus: 'not sent'});
        }, 2000);
      });
    }
  };
  render() {
    const state = this.state;
    return (
      <Contact
        yourName={state.yourName}
        yourEmail={state.yourEmail}
        message={state.message}
        updateYourName={this.updateYourName}
        updateYourEmail={this.updateYourEmail}
        updateMessage={this.updateMessage}
        messageStatus={state.messageStatus}
        sendButtonPressed={this.sendButtonPressed}
        submissionStatusHandler={this.submissionStatusHandler}
      />
    );
  }
}

export default ContactContainer;