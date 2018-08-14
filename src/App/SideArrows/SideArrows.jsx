import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import style from './SideArrows.scss';
import ArrowMajor from '../../Assets/Static/ArrowMajor.png';
import ArrowMinor from '../../Assets/Static/ArrowMinor.png';
import {
  moveOneSectionToLeft,
  moveOneSectionToRight
} from '../../Actions/CurrentSectionIndex';
import {
  moveOnePageToLeft,
  moveOnePageToRight
} from '../../Actions/CurrentViewIndex';
import SideArrowMajorClick from '../../Utils/SideArrowMajorClick';

const SideArrows = props => {
  const {
    side_arrows,
    arrow_major_wrapper,
    arrow_minor_wrapper,
    arrow_major,
    arrow_minor
  } = style;
  return (
    <div
      className={side_arrows}
      style={{
        transform: props.flipped && 'scale(-1, 1)',
        opacity: props.disabled && 0.3
      }}
    >
      <div
        className={arrow_major_wrapper}
        style={{cursor: !props.disabled && 'pointer'}}
        onClick={() => {
          if(!props.disabled) {
            if(props.flipped) {
              if(props.CurrentSectionIndex < 4) {
                props.moveOneSection(
                  moveOneSectionToRight,
                  props.SectionBeforeContact+1
                );
                SideArrowMajorClick(props, props.SectionBeforeContact+1);
              }
              else if(props.CurrentSectionIndex === 4) {
                props.openContact();
              }
            }
            else {
              if(props.SectionBeforeContact > 0) {
                props.moveOneSection(
                  moveOneSectionToLeft,
                  props.SectionBeforeContact-1
                );
                SideArrowMajorClick(props, props.SectionBeforeContact-1);
              }
            }
          }
        }}
      >
        <img
          alt='Arrow major'
          className={arrow_major}
          src={props.arrowMajorImage}
        />
      </div>
      <div
        className={arrow_minor_wrapper}
        style={{cursor: !props.disabled && 'pointer'}}
        onClick={() => {
          if(!props.disabled) {
            if(props.flipped) {
              if(props.CurrentViewIndex < props.allPagesUrls.length-2) {
                props.moveOnePage(
                  moveOnePageToRight,
                  props.ViewBeforeContact+1
                );
              }
              else if(props.CurrentViewIndex === props.allPagesUrls.length-2) {
                props.openContact();
              }
            }
            else {
              if(props.CurrentViewIndex > 0) {
                props.moveOnePage(
                  moveOnePageToLeft,
                  props.ViewBeforeContact-1
                );
              }
            }
          }
        }}
      >
        <img
          alt='Arrow minor'
          className={arrow_minor}
          src={props.arrowMinorImage}
        />
      </div>
    </div>
  );
};

SideArrows.defaultProps = {
  arrowMinorImage: ArrowMinor,
  arrowMajorImage: ArrowMajor
};

const mapStateToProps = store => ({
  ViewBeforeContact: store.ViewBeforeContact,
  SectionBeforeContact: store.SectionBeforeContact,
  CurrentSectionIndex: store.CurrentSectionIndex,
  CurrentViewIndex: store.CurrentViewIndex,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  allPagesUrls: store.AllPages.allPagesUrls,
  currentGuideIndex: store.Guide.currentGuideIndex,
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  isProgressBarPausedByRevisiting: store.ProgressBar.isProgressBarPausedByRevisiting,
  isProgressBarPausedByTouchEvent: store.ProgressBar.isProgressBarPausedByTouchEvent
});

export default withRouter(connect(mapStateToProps)(SideArrows));