import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AssignCorrectUrl extends Component {
  componentDidMount() {
    this.assignCorrectUrlHanlder();
  }
  componentDidUpdate() {
    this.assignCorrectUrlHanlder();
  }
  assignCorrectUrlHanlder = () => {
    const props = this.props;
    if(
      typeof props.CurrentViewIndex === 'number' &&
      props.location.pathname !== props.allPagesUrls[props.CurrentViewIndex]
    ) {
      if(!props.isContactViewOpen) {
        props.history.push(props.allPagesUrls[props.CurrentViewIndex]);
      }
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = store => ({
  CurrentViewIndex: store.CurrentViewIndex,
  allPagesUrls: store.AllPages.allPagesUrls,
})

export default withRouter(connect(mapStateToProps)(AssignCorrectUrl));