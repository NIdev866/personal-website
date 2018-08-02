import {
  UPDATE_SCREEN_HEIGHT
} from '../Actions/ScreenHeight';

function ScreenHeightReducer(state = null, action) {
  switch(action.type) {
  case UPDATE_SCREEN_HEIGHT:
    return action.payload;
  default:
    return state;
  }
}

export default ScreenHeightReducer;