import {
  DISPLAY_GUIDE,
  REMOVE_GUIDE_FROM_DISPLAY,
  SHOW_NEXT_GUIDE,
  TWO_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED,
  SWIPE_UP_HAS_BEEN_TRIGGERED,
  ZOOM_OUT_HAS_BEEN_TRIGGERED,
} from '../Actions/Guide';

const defaultState = {
  currentGuideIndex: 0,
  isGuideDisplayed: false,
  hasTwoFingerSideSwipeBeenTriggered: false,
  hasSwipeUpBeenTriggered: false,
  hasZoomOutBeenTriggered: false,
};

function GuideReducer(state = defaultState, action) {
  let newState = {...state};
  switch (action.type) {
  case DISPLAY_GUIDE:
    newState.isGuideDisplayed = true;
    newState.currentGuideIndex++;
    if(
      newState.currentGuideIndex === 2 &&
      newState.hasTwoFingerSideSwipeBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    if(
      newState.currentGuideIndex === 3 &&
      newState.hasSwipeUpBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    if(
      newState.currentGuideIndex === 4 &&
      newState.hasZoomOutBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    return newState;
  case REMOVE_GUIDE_FROM_DISPLAY:
    newState.isGuideDisplayed = false;
    return newState;
  case SHOW_NEXT_GUIDE:
    newState.currentGuideIndex++;
    if(
      newState.currentGuideIndex === 2 &&
      newState.hasTwoFingerSideSwipeBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    if(
      newState.currentGuideIndex === 3 &&
      newState.hasSwipeUpBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    if(
      newState.currentGuideIndex === 4 &&
      newState.hasZoomOutBeenTriggered
    ) {
      newState.currentGuideIndex++;
    }
    return newState;
  case TWO_FINGER_SIDE_SWIPE_HAS_BEEN_TRIGGERED:
    newState.hasTwoFingerSideSwipeBeenTriggered = true;
    return newState;
  case SWIPE_UP_HAS_BEEN_TRIGGERED:
    newState.hasSwipeUpBeenTriggered = true;
    return newState;
  case ZOOM_OUT_HAS_BEEN_TRIGGERED:
    newState.hasZoomOutBeenTriggered = true;
    return newState;
  default:
    return state;
  }
}

export default GuideReducer;