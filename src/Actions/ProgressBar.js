export const PAUSE_PROGRESS_BAR_MANUALLY = 'PAUSE_PROGRESS_BAR_MANUALLY';
export const UNPAUSE_PROGRESS_BAR_MANUALLY = 'UNPAUSE_PROGRESS_BAR_MANUALLY';
export const PAUSE_PROGRESS_BAR_BY_REVISITING = 'PAUSE_PROGRESS_BAR_BY_REVISITING';
export const UNPAUSE_PROGRESS_BAR_BY_REVISITING = 'UNPAUSE_PROGRESS_BAR_BY_REVISITING';
export const PAUSE_PROGRESS_BAR_BY_TOUCH_EVENT = 'PAUSE_PROGRESS_BAR_BY_TOUCH_EVENT';
export const UNPAUSE_PROGRESS_BAR_BY_TOUCH_EVENT = 'UNPAUSE_PROGRESS_BAR_BY_TOUCH_EVENT';
export const INCREASE_PROGRESS_BAR_PROGRESS = 'INCREASE_PROGRESS_BAR_PROGRESS';
export const RESET_PROGRESS_BAR = 'RESET_PROGRESS_BAR';
export const ADD_VIEW_TO_PREVIOUSLY_OPENED_VIEWS = 'ADD_VIEW_TO_PREVIOUSLY_OPENED_VIEWS';

let increaseInterval = null;

export const continueProgressBar = () => dispatch => {
  clearInterval(increaseInterval);
  increaseInterval = setInterval(() => {
    dispatch(increaseProgressBarProgress());
  }, 110);
};

export const pauseProgressBarManually = () => dispatch => {
  clearInterval(increaseInterval);
  dispatch({type: PAUSE_PROGRESS_BAR_MANUALLY});
};

export const unpauseProgressBarManually = () => (dispatch, getState) => {
  if(
    getState().ProgressBar.isProgressBarPausedManually &&
    !getState().ProgressBar.isProgressBarPausedByRevisiting &&
    !getState().ProgressBar.isProgressBarPausedByTouchEvent
  ) {
    dispatch(increaseProgressBarProgress());
    increaseInterval = setInterval(() => {
      dispatch(increaseProgressBarProgress());
    }, 110);
  }
  dispatch({type: UNPAUSE_PROGRESS_BAR_MANUALLY});
};

export const pauseProgressBarByRevisiting = () => dispatch => {
  clearInterval(increaseInterval);
  dispatch({type: PAUSE_PROGRESS_BAR_BY_REVISITING});
};

export const unpauseProgressBarByRevisiting = () => (dispatch, getState) => {
  if(
    !getState().ProgressBar.isProgressBarPausedManually &&
    getState().ProgressBar.isProgressBarPausedByRevisiting &&
    !getState().ProgressBar.isProgressBarPausedByTouchEvent
  ) {
    dispatch(increaseProgressBarProgress());
    increaseInterval = setInterval(() => {
      dispatch(increaseProgressBarProgress());
    }, 110);
  }
  dispatch({type: UNPAUSE_PROGRESS_BAR_BY_REVISITING});
};

export const pauseProgressBarByTouchEvent = () => dispatch => {
  clearInterval(increaseInterval);
  dispatch({type: PAUSE_PROGRESS_BAR_BY_TOUCH_EVENT});
};

export const unpauseProgressBarByTouchEvent = () => (dispatch, getState) => {
  if(
    !getState().ProgressBar.isProgressBarPausedManually &&
    !getState().ProgressBar.isProgressBarPausedByRevisiting &&
    getState().ProgressBar.isProgressBarPausedByTouchEvent
  ) {
    dispatch(increaseProgressBarProgress());
    increaseInterval = setInterval(() => {
      dispatch(increaseProgressBarProgress());
    }, 110);
  }
  dispatch({type: UNPAUSE_PROGRESS_BAR_BY_TOUCH_EVENT});
};

export const increaseProgressBarProgress = () => ({
  type: INCREASE_PROGRESS_BAR_PROGRESS
});

export const resetProgressBar = () => dispatch => {
  clearInterval(increaseInterval);
  dispatch({type: RESET_PROGRESS_BAR});
};

export const addViewToPreviouslyOpenedViews = viewIndex => ({
  type: ADD_VIEW_TO_PREVIOUSLY_OPENED_VIEWS,
  payload: viewIndex
});