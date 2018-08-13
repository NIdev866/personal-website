import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ContactContainer from '../Content/Contact/ContactContainer';
import style from './ProgressBarMobileContact.scss';
import {showNextGuide} from '../../Actions/Guide';
import {
  addViewToPreviouslyOpenedViews,
  continueProgressBar,
  pauseProgressBarByRevisiting,
  resetProgressBar,
  unpauseProgressBarByTouchEvent
} from '../../Actions/ProgressBar';
import {moveOnePageToRight} from '../../Actions/CurrentViewIndex';
import {registerViewBeforeContact} from '../../Actions/ViewBeforeContact';
import NextViewIsInNextSection from '../../Utils/NextViewIsInNextSection';
import {registerSectionBeforeContact} from '../../Actions/SectionBeforeContact';
import {registerSubMenuOpened} from '../../Actions/SubMenuOpened';
import {registerCurrentSectionIndex} from '../../Actions/CurrentSectionIndex';
import ResponsiveContactViewHeight from '../../Utils/ResponsiveContactViewHeight';

const ProgressBarMobileContact = props => {
  const {
    progress_bar_mobile_contact,
    progress_bar_wrapper,
    progress_bar
  } = style;
  if(
    props.SectionBeforeContact !== null &&
    props.eachSectionFirstPageIndex !== null &&
    props.ViewBeforeContact !== null &&
    props.progressBarProgress === 100
  ) {
    if(props.currentGuideIndex <= 4) {
      props.dispatch(showNextGuide());
    }
    props.dispatch(addViewToPreviouslyOpenedViews(
      props.ViewBeforeContact
    ));
    props.dispatch(resetProgressBar());
    if(props.ViewBeforeContact === props.allPagesUrls.length-2) {
      props.dispatch(pauseProgressBarByRevisiting());
      props.openContact();
    }
    else {
      props.dispatch(moveOnePageToRight());
      if(
        !props.previouslyOpenedViews.indexOf(props.ViewBeforeContact+1) >= 0 &&
        (!props.isProgressBarPausedManually)
      ) {
        props.dispatch(unpauseProgressBarByTouchEvent());
        props.dispatch(continueProgressBar());
      }
      else {
        props.dispatch(pauseProgressBarByRevisiting());
      }
      props.dispatch(addViewToPreviouslyOpenedViews(
        props.ViewBeforeContact+1
      ));
      props.dispatch(registerViewBeforeContact(props.ViewBeforeContact+1));
      if(NextViewIsInNextSection(
        props.ViewBeforeContact+1,
        props.SectionBeforeContact,
        props.eachSectionFirstPageIndex
      )) {
        props.dispatch(registerSectionBeforeContact(props.SectionBeforeContact+1));
        props.dispatch(registerSubMenuOpened(props.SectionBeforeContact+1));
        props.dispatch(registerCurrentSectionIndex(props.SectionBeforeContact+1));
      }
    }
  }
  return (
    <div
      className={progress_bar_mobile_contact}
      style={{
        height: ResponsiveContactViewHeight(props.ScreenWidth, props.distanceUp, 'mobile'),
        transition: props.transitionState
      }}
    >
      <div
        className={progress_bar_wrapper}
      >
        <div
          className={progress_bar}
          style={{
            width: `${props.progressBarProgress}%`
          }}
        />
      </div>
      <ContactContainer />
    </div>
  );
};

const mapStateToProps = store => ({
  ScreenWidth: store.ScreenWidth,
  SectionBeforeContact: store.SectionBeforeContact,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  ViewBeforeContact: store.ViewBeforeContact,
  progressBarProgress: store.ProgressBar.progressBarProgress,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews,
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  allPagesUrls: store.AllPages.allPagesUrls,
  currentGuideIndex: store.Guide.currentGuideIndex
});

export default withRouter(connect(mapStateToProps)(ProgressBarMobileContact));