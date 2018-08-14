import React, {Component} from 'react';

import Portfolio from './Portfolio';

class PortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footageUpdating: false,
      currentData: null
    };
  }
  componentDidMount() {
    const state = this.state;
    const props = this.props;
    if(
      state.currentData === null
    ) {
      this.setState({currentData: props.data});
    }
    else if(state.currentData !== null){
      if(state.currentData.headerTitle !== props.data.headerTitle) {
        this.setState({currentData: props.data});
      }
    }
  };
  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    if(
      state.currentData === null
    ) {
      this.setState({currentData: props.data});
    }
    else if(state.currentData !== null){
      if(state.currentData.headerTitle !== props.data.headerTitle) {
        this.setState({
          footageUpdating: true,
          currentData: props.data
        },() => {
          setTimeout(() => {
            this.setState({footageUpdating: false});
          }, 10);
        });
      }
    }
  }
  render() {
    const props = this.props;
    const state = this.state;
    return (
      <Portfolio
        data={props.data}
        footageUpdating={state.footageUpdating}
      />
    );
  }
}

export default PortfolioContainer;