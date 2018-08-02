export const DISPLAY_GUIDE = 'DISPLAY_GUIDE';
export const REMOVE_GUIDE_FROM_DISPLAY = 'REMOVE_GUIDE_FROM_DISPLAY';
export const SHOW_NEXT_GUIDE = 'SHOW_NEXT_GUIDE';
export const ONE_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED = 'ONE_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED';
export const TWO_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED = 'TWO_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED';
export const SWIPE_UP_HAS_BEEN_TRIGGERED = 'SWIPE_UP_HAS_BEEN_TRIGGERED';
export const ZOOM_OUT_HAS_BEEN_TRIGGERED = 'ZOOM_OUT_HAS_BEEN_TRIGGERED';

let transitionTimeout = null;

export const displayGuide = () => dispatch => {
  dispatch(removeGuideFromDisplay());
  transitionTimeout = setTimeout(() => {
    dispatch({type: DISPLAY_GUIDE});
    transitionTimeout = setTimeout(() => {
      dispatch(removeGuideFromDisplay());
    }, 5000);
  }, 300);
};

export const removeGuideFromDisplay = () => ({
  type: REMOVE_GUIDE_FROM_DISPLAY
});

export const showNextGuide = () => dispatch => {
  clearTimeout(transitionTimeout);
  dispatch(displayGuide());
};

export const oneFingerSideSwipeHasBeenTriggered = () => ({
  type: ONE_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED
});

export const twoFingerSideSwipeHasBeenTriggered = () => ({
  type: TWO_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED
});

export const swipeUpHasBeenTriggered = () => ({
  type: SWIPE_UP_HAS_BEEN_TRIGGERED
});

export const zoomOutHasBeenTriggered = () => ({
  type: ZOOM_OUT_HAS_BEEN_TRIGGERED
});
