import {
  REGISTER_CURRENT_VIEW_INDEX,
  MOVE_ONE_PAGE_TO_LEFT,
  MOVE_ONE_PAGE_TO_RIGHT
} from '../Actions/CurrentViewIndex';

function CurrentViewIndexReducer(state = null, action) {
  switch(action.type) {
  case REGISTER_CURRENT_VIEW_INDEX:
    return action.payload;
  case MOVE_ONE_PAGE_TO_LEFT:
    return state-1;
  case MOVE_ONE_PAGE_TO_RIGHT:
    return state+1;
  default:
    return state;
  }
}

export default CurrentViewIndexReducer;