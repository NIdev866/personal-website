import React from 'react';
import {connect} from 'react-redux';

import style from './Guide.scss';
import guideGif from '../../Assets/Static/Gestures/1.gif';
import guideGif2 from '../../Assets/Static/Gestures/2.gif';
import guideGif3 from '../../Assets/Static/Gestures/3.gif';
import guideGif4 from '../../Assets/Static/Gestures/4.gif';

const Guide = props => {
  const {
    guide_wrapper,
    guide,
    guide_text,
    guide_gif
  } = style;
  return (
    <div
      className={guide_wrapper}
      style={{
        top:!props.isGuideDisplayed && '-125px',
        right: !props.isGuideDisplayed && '-175px'
      }}
    >
      <div className={guide}>
        <div className={guide_text}>{props.guideTexts[props.currentGuideIndex-1]}</div>
        <img alt='Guide gif' className={guide_gif} src={props.guideGifs[props.currentGuideIndex-1]} />
      </div>
    </div>
  );
};

Guide.defaultProps = {
  guideGifs: [
    guideGif,
    guideGif2,
    guideGif3,
    guideGif4
  ],
  guideTexts: [
    'Prev/Next Page',
    'Prev/Next Section',
    'Contact Page',
    'Main Menu'
  ]
};

const mapStateToProps = store => ({
  currentGuideIndex: store.Guide.currentGuideIndex,
  isGuideDisplayed: store.Guide.isGuideDisplayed
});

export default connect(mapStateToProps)(Guide);