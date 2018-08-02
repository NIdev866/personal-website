import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {updateScreenWidth} from "../Actions/ScreenWidth";
import {updateScreenHeight} from "../Actions/ScreenHeight";

class AppContainer extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    const props = this.props;
    if(props.ScreenWidth !== window.innerWidth) {
      props.dispatch(updateScreenWidth(window.innerWidth));
    }
    if(props.ScreenHeight !== window.innerHeight) {
      props.dispatch(updateScreenHeight(window.innerHeight));
    }
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = store => ({
  ScreenWidth: store.ScreenWidth,
  ScreenHeight: store.ScreenHeight,
})

export default withRouter(connect(mapStateToProps)(AppContainer));