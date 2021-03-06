import React from 'react';
import {connect} from 'react-redux';

import style from './View.scss';
import About from './About/About';
import Experience from './Experience/Experience';
import PortfolioContainer from './Portfolio/PortfolioContainer';
import SkillsContainer from './Skills/SkillsContainer';
import EducationContainer from './Education/EducationContainer';
import ViewLeftPosition from '../../../Utils/ViewLeftPosition';
import ViewSwipeScale from '../../../Utils/ViewSwipeScale';

const View = props => {
  const {
    view_wrapper,
    view
  } = style;
  let correctView = null;
  if(
    props.allViewsFlat &&
    props.ViewBeforeContact !== null
  ) {
    if(props.allViewsFlat[props.ViewBeforeContact]) {
      correctView = props.allViewsFlat[props.ViewBeforeContact].SECTION_NAME;
    }
    else {
      correctView = 0;
    }
  }
  return (
    <div
      style={{
        left: ViewLeftPosition(
          props.sideSwipeDistance,
          props.event,
          props.ViewBeforeContact,
          props.SectionBeforeContact,
          props.allPagesUrls
        ),
        transform: `scale(${ViewSwipeScale(
          props.sideSwipeDistance,
          props.event,
          props.ViewBeforeContact,
          props.SectionBeforeContact,
          props.allPagesUrls
        )})`,
        transition: props.transitionState
      }}
      className={view_wrapper}
    >
      <div className={view}>
        {(() => {
          switch(correctView) {
          case 'About':
            return <About data={props.allViewsFlat[props.ViewBeforeContact]} />;
          case 'Experience':
            return <Experience data={props.allViewsFlat[props.ViewBeforeContact]} />;
          case 'Portfolio':
            return <PortfolioContainer data={props.allViewsFlat[props.ViewBeforeContact]} />;
          case 'Skills':
            return <SkillsContainer data={props.allViewsFlat[props.ViewBeforeContact]} />;
          case 'Education':
            return <EducationContainer data={props.allViewsFlat[props.ViewBeforeContact]} />;
          default:
            return null;
          }
        })()}
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  SectionBeforeContact: store.SectionBeforeContact,
  ViewBeforeContact: store.ViewBeforeContact,
  allViewsFlat: store.AllPages.allViewsFlat,
  allPagesUrls: store.AllPages.allPagesUrls
});

export default connect(mapStateToProps)(View);