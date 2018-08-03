import {
  PAUSE_PROGRESS_BAR_MANUALLY,
  UNPAUSE_PROGRESS_BAR_MANUALLY,
  PAUSE_PROGRESS_BAR_BY_REVISITING,
  UNPAUSE_PROGRESS_BAR_BY_REVISITING,
  PAUSE_PROGRESS_BAR_BY_TOUCH_EVENT,
  UNPAUSE_PROGRESS_BAR_BY_TOUCH_EVENT,
  INCREASE_PROGRESS_BAR_PROGRESS,
  RESET_PROGRESS_BAR,
  ADD_VIEW_TO_PREVIOUSLY_OPENED_VIEWS,
} from '../Actions/ProgressBar';

let defaultState = {
  isProgressBarPausedManually: false,
  isProgressBarPausedByRevisiting: false,
  isProgressBarPausedByTouchEvent: false,
  progressBarProgress: 0,
  previouslyOpenedViews: []
};

function ProgressBarReducer(state = defaultState, action) {
  switch (action.type) {
  case PAUSE_PROGRESS_BAR_MANUALLY:
    return {...state, isProgressBarPausedManually: true};
  case UNPAUSE_PROGRESS_BAR_MANUALLY:
    return {...state, isProgressBarPausedManually: false};
  case PAUSE_PROGRESS_BAR_BY_REVISITING:
    return {...state, isProgressBarPausedByRevisiting: true};
  case UNPAUSE_PROGRESS_BAR_BY_REVISITING:
    return {...state, isProgressBarPausedByRevisiting: false};
  case PAUSE_PROGRESS_BAR_BY_TOUCH_EVENT:
    return {...state, isProgressBarPausedByTouchEvent: true};
  case UNPAUSE_PROGRESS_BAR_BY_TOUCH_EVENT:
    return {...state, isProgressBarPausedByTouchEvent: false};
  case INCREASE_PROGRESS_BAR_PROGRESS:
    return {...state, progressBarProgress: state.progressBarProgress+1};
  case RESET_PROGRESS_BAR:
    return {...state, progressBarProgress: 0};
  case ADD_VIEW_TO_PREVIOUSLY_OPENED_VIEWS:
    const newState = {...state};
    if(!newState.previouslyOpenedViews.indexOf(action.payload) >= 0) {
      newState.previouslyOpenedViews.push(action.payload);
    }
    return newState;
  default:
    return state;
  }
}

export default ProgressBarReducer;