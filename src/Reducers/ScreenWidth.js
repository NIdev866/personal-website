import {
  UPDATE_SCREEN_WIDTH
} from '../Actions/ScreenWidth';

function ScreenWidthReducer(state = null, action) {
  switch(action.type) {
  case UPDATE_SCREEN_WIDTH:
    return action.payload;
  default:
    return state;
  }
}

export default ScreenWidthReducer;