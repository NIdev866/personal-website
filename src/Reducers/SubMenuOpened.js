import {
  REGISTER_SUB_MENU_OPENED
} from '../Actions/SubMenuOpened';

function SubMenuOpenedReducer(state = null, action) {
  switch(action.type) {
  case REGISTER_SUB_MENU_OPENED:
    return action.payload;
  default:
    return state;
  }
}

export default SubMenuOpenedReducer;