import {
  REGISTER_CURRENT_SECTION_INDEX,
  MOVE_ONE_SECTION_TO_LEFT,
  MOVE_ONE_SECTION_TO_RIGHT
} from '../Actions/CurrentSectionIndex';

function CurrentSectionIndexReducer(state = null, action) {
  switch(action.type) {
  case REGISTER_CURRENT_SECTION_INDEX:
    return action.payload;
  case MOVE_ONE_SECTION_TO_LEFT:
    return state-1;
  case MOVE_ONE_SECTION_TO_RIGHT:
    return state+1;
  default:
    return state;
  }
}

export default CurrentSectionIndexReducer;