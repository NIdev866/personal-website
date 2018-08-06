import React, {Component} from 'react';

import Loading from './Loading';

class LoadingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingViewState: 'fullyVisible',
      topLeftLeft: '0',
      bottomRightLeft: '0'
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if(
      nextProps.hasBackgroundLoaded &&
      nextState.topLeftLeft !== '-100%' &&
      nextState.bottomRightLeft !== '100%' &&
      nextState.loadingViewState !== 'disappeared'
    ) {
      setTimeout(()=>{
        this.setState({topLeftLeft: '-100%', bottomRightLeft: '100%'}, () => {
          setTimeout(()=>{this.setState({loadingViewState: 'disappeared'});}, 1300);
        });
      }, 200);
    }
  }
  render() {
    const state = this.state;
    const props = this.props;
    if(state.loadingViewState === 'disappeared') {
      return null;
    }
    return (
      <Loading
        topLeftLeft={state.topLeftLeft}
        bottomRightLeft={state.bottomRightLeft}
        hasBackgroundLoaded={props.hasBackgroundLoaded}
      />
    );
  }
}

export default LoadingContainer;