import React, {Component} from 'react';

import ContactOverlay from './ContactOverlay';

class ContactOverlayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactOverlayViewState: 'fullyVisible'
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if(
      nextProps.distanceUp === 0 &&
      nextState.contactOverlayViewState !== 'disappeared'
    ) {
      setTimeout(() => {
        this.setState({contactOverlayViewState: 'disappeared'});
      }, 300);
    }
    else if(
      nextProps.distanceUp > 0 &&
      nextState.contactOverlayViewState !== 'fullyVisible'
    ) {
      this.setState({contactOverlayViewState: 'fullyVisible'});
    }
  }
  render() {
    const state = this.state;
    const props = this.props;
    let displayVariable = 'block';
    if(state.contactOverlayViewState === 'disappeared') {
      displayVariable = 'none';
    }
    return (
      <ContactOverlay
        closeContact={props.closeContact}
        distanceUp={props.distanceUp}
        transitionState={props.transitionState}
        contactOverlayViewState={state.contactOverlayViewState}
        displayVariable={displayVariable}
      />
    );
  };
}

export default ContactOverlayContainer;