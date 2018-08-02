import {
  REGISTER_SECTION_BEFORE_CONTACT
} from '../Actions/SectionBeforeContact';

function SectionBeforeContactReducer(state = null, action) {
  switch(action.type) {
  case REGISTER_SECTION_BEFORE_CONTACT:
    return action.payload;
  default:
    return state;
  }
}

export default SectionBeforeContactReducer;