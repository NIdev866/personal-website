import {
  continueProgressBar,
  pauseProgressBarByRevisiting,
  resetProgressBar,
  unpauseProgressBarByRevisiting
} from '../Actions/ProgressBar';

const SideArrowMajorClick = (props, newSection) => {
  if(
    props.previouslyOpenedViews.indexOf(
      props.eachSectionFirstPageIndex[newSection]
    ) >= 0
  ) {
    props.dispatch(pauseProgressBarByRevisiting());
    props.dispatch(resetProgressBar());
  }
  else {
    props.dispatch(unpauseProgressBarByRevisiting());
    props.dispatch(resetProgressBar());
    if(!props.isProgressBarPausedManually) {
      props.dispatch(continueProgressBar());
    }
  }
};

export default SideArrowMajorClick;