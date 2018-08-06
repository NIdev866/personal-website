import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import StateContainer from '../Utils/StateContainer';
import {updateScreenWidth} from '../Actions/ScreenWidth';
import {updateScreenHeight} from '../Actions/ScreenHeight';
import {registerCurrentSectionIndex} from '../Actions/CurrentSectionIndex';
import {registerCurrentViewIndex} from '../Actions/CurrentViewIndex';
import {addViewToPreviouslyOpenedViews} from '../Actions/ProgressBar';
import {registerSectionBeforeContact} from '../Actions/SectionBeforeContact';
import {registerViewBeforeContact} from '../Actions/ViewBeforeContact';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCurrentViewIndexRegistered: false
    };
  }
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
  };
  setInitialCurrentViewIndex = () => {
    const props = this.props;
    let result = null;
    if(props.SectionBeforeContact !== null) {
      return props.SectionBeforeContact;
    }
    props.allPagesUrls.filter((pageUrl, index) => {
      if(props
        .location
        .pathname
        .toLowerCase()
        .indexOf(pageUrl.toLowerCase()) === 0
      ) {
        result = index;
      }
      return true;
    });
    if(result !== null) {
      if(
        props.allPagesUrls &&
        result === props.allPagesUrls.length-1
      ) {
        props.dispatch(registerCurrentSectionIndex(5));
        return 0;
      }
      return result;
    }
    return 0;
  };
  setInitialCurrentSectionIndex = which => {
    const props = this.props;
    let initialViewIndex = this.setInitialCurrentViewIndex();
    let result = null;
    if(initialViewIndex === props.allPagesUrls.length-1) {
      if(which === 'current') {
        return 5;
      }
      return 0;
    }
    let localEachSectionFirstPageIndex = [...props.eachSectionFirstPageIndex];
    if(localEachSectionFirstPageIndex) {
      localEachSectionFirstPageIndex.map((sectionFirstPageIndex, actualIndex) => {
        if(sectionFirstPageIndex <= initialViewIndex) {
          result = actualIndex;
        }
        return true;
      });
    }
    return result;
  };
  componentDidUpdate() {
    const props = this.props;
    const state = this.state;
    if(
      props.ViewBeforeContact !== null &&
      !props.previouslyOpenedViews.indexOf(props.ViewBeforeContact) >= 0
    ) {
      props.dispatch(addViewToPreviouslyOpenedViews(props.ViewBeforeContact));
    }
    if(
      props.allPagesUrls &&
      props.allPagesUrls.length !== 0 &&
      !state.initialCurrentViewIndexRegistered
    ) {
      this.setState({initialCurrentViewIndexRegistered: true}, () => {
        props.dispatch(registerCurrentViewIndex(this.setInitialCurrentViewIndex()));
        props.dispatch(registerCurrentSectionIndex(this.setInitialCurrentSectionIndex('current')));
        props.dispatch(registerSectionBeforeContact(this.setInitialCurrentSectionIndex('before')));
        props.dispatch(registerViewBeforeContact(this.setInitialCurrentViewIndex()));
      });
    }
  }
  render() {
    return <StateContainer />;
  }
}

const mapStateToProps = store => ({
  ScreenWidth: store.ScreenWidth,
  ScreenHeight: store.ScreenHeight,
  allPagesUrls: store.AllPages.allPagesUrls,
  SectionBeforeContact: store.SectionBeforeContact,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  ViewBeforeContact: store.ViewBeforeContact,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews
});

export default withRouter(connect(mapStateToProps)(AppContainer));