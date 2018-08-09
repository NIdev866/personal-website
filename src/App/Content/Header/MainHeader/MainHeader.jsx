import React from 'react';
import {connect} from 'react-redux';

import style from './MainHeader.scss';
import {withRouter} from 'react-router-dom';
import {showNextGuide} from '../../../../Actions/Guide';
import {registerSubMenuOpened} from '../../../../Actions/SubMenuOpened';
import {
  addViewToPreviouslyOpenedViews, continueProgressBar, pauseProgressBarByRevisiting, resetProgressBar,
  unpauseProgressBarByRevisiting,
  unpauseProgressBarByTouchEvent
} from '../../../../Actions/ProgressBar';
import {registerSectionBeforeContact} from '../../../../Actions/SectionBeforeContact';
import {registerCurrentViewIndex} from '../../../../Actions/CurrentViewIndex';
import {registerViewBeforeContact} from '../../../../Actions/ViewBeforeContact';
import {registerCurrentSectionIndex} from '../../../../Actions/CurrentSectionIndex';

const MainHeader = props => {
  const {
    header_row,
    each_item
  } = style;
  return (
    <div className={['row', header_row].join(' ')}>
      {props.AllSections && props.AllSections.map((Section, index) => {
        <div
          onClick={()=>{
            if(index !== props.SectionBeforeContact) {
              if(Section !== 'Contact') {
                if(props.currentGuideIndex <= 4) {
                  props.dispatch(showNextGuide());
                }
                props.dispatch(registerSubMenuOpened(index));
                if(!props.previouslyOpenedViews.indexOf(
                  props.ViewBeforeContact) >= 0
                ) {
                  props.dispatch(addViewToPreviouslyOpenedViews(
                    props.ViewBeforeContact
                  ));
                }
                props.dispatch(resetProgressBar());
                props.dispatch(unpauseProgressBarByTouchEvent());
                if(props.isProgressBarPausedManually) {
                  props.dispatch(resetProgressBar());
                }
                if(
                  props.previouslyOpenedViews.indexOf(
                    props.eachSectionFirstPageIndex[index]
                  ) >= 0
                ) {
                  props.dispatch(pauseProgressBarByRevisiting());
                  props.dispatch(resetProgressBar());
                }
                else {
                  props.dispatch(unpauseProgressBarByRevisiting());
                  if(
                    !props.isProgressBarPausedManually &&
                    !props.isProgressBarPausedByRevisiting &&
                    !props.isProgressBarPausedByTouchEvent
                  ) {
                    props.dispatch(continueProgressBar());
                  }
                  if(props.isProgressBarPausedManually) {
                    props.dispatch(resetProgressBar());
                  }
                }
                props.dispatch(registerSectionBeforeContact(index));
                props.dispatch(registerCurrentViewIndex(
                  props.eachSectionFirstPageIndex[index])
                );
                props.dispatch(registerViewBeforeContact(
                  props.eachSectionFirstPageIndex[index]
                ));
                props.dispatch(registerCurrentSectionIndex(index));
              }
              else if(Section === 'Contact') {
                props.openContact();
              }
            }
          }}
          className={each_item}
          key={Section}
          style={{color: props.CurrentSectionIndex === index && '#b338f7'}}
        >
          {Section}
        </div>;
      })}
    </div>
  );
};

const mapStateToProps = store => ({
  AllSections: store.AllSections,
  CurrentSectionIndex: store.CurrentSectionIndex,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  allPagesUrls: store.AllPages.allPagesUrls,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews,
  ViewBeforeContact: store.ViewBeforeContact,
  SectionBeforeContact: store.SectionBeforeContact,
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  isProgressBarPausedByRevisiting: store.ProgressBar.isProgressBarPausedByRevisiting,
  isProgressBarPausedByTouchEvent: store.ProgressBar.isProgressBarPausedByTouchEvent,
  currentGuideIndex: store.Guide.currentGuideIndex
})

export default withRouter(connect(mapStateToProps)(MainHeader));