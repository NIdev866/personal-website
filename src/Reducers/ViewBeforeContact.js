import {
  REGISTER_VIEW_BEFORE_CONTACT
} from '../Actions/ViewBeforeContact';

function ViewBeforeContactReducer(state = null, action) {
  switch(action.type) {
  case REGISTER_VIEW_BEFORE_CONTACT:
    return action.payload;
  default:
    return state;
  }
}

export default ViewBeforeContactReducer;