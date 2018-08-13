import React from 'react';
import {connect} from 'react-redux';

import style from './Footer.scss';
import Play from '../../../Assets/Static/Play.png';
import Pause from '../../../Assets/Static/Pause.png';
import {
  pauseProgressBarManually,
  unpauseProgressBarManually,
  unpauseProgressBarByRevisiting
} from '../../../Actions/ProgressBar';

const Footer = props => {
  const {
    footer_wrapper,
    footer,
    pause_button,
    helper,
    pause_image,
    main_menu_button
  } = style;
  return (
    <div className={footer_wrapper}>
      <div className={footer}>
        <div
          className={pause_button}
          onClick={() => {
            if(props.isProgressBarPausedByRevisiting) {
              props.dispatch(unpauseProgressBarByRevisiting());
              props.dispatch(unpauseProgressBarManually());
            }
            else if(props.isProgressBarPausedManually) {
              props.dispatch(unpauseProgressBarManually());
            }
            else {
              props.dispatch(pauseProgressBarManually());
            }
          }}
        >
          <span className={helper} />
          <img
            alt='Pause'
            src={(
              props.isProgressBarPausedManually ||
              props.isProgressBarPausedByRevisiting ||
              props.isProgressBarPausedByTouchEvent
            ) ?
              props.playImage :
              props.pauseImage
            }
            className={pause_image}
          />
        </div>
        <div
          onClick={props.openMainMenuByPressingButton}
          className={main_menu_button}
        >
          Main Menu
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  playImage: Play,
  pauseImage: Pause
};

const mapStateToProps = store => ({
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  isProgressBarPausedByRevisiting: store.ProgressBar.isProgressBarPausedByRevisiting,
  isProgressBarPausedByTouchEvent: store.ProgressBar.isProgressBarPausedByTouchEvent,
});

export default connect(mapStateToProps)(Footer);