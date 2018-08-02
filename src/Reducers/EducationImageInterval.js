import {
  START_EDUCATION_IMAGE_INTERVAL,
  SWITCH_EDUCATION_IMAGE,
  SET_EDUCATION_IMAGE_INTERVAL_INDEX
} from '../Actions/EducationImageInterval';

const defaultState = {
  hasEducationImageIntervalStarted: false,
  educationImageIntervalImageIndex: 0
};

function EducationImageIntervalReducer(state = defaultState, action) {
  let newState = {...state};
  switch(action.type) {
  case SWITCH_EDUCATION_IMAGE:
    if(newState.educationImageIntervalImageIndex === 0) {
      newState.educationImageIntervalImageIndex = 1;
    }
    else if(newState.educationImageIntervalImageIndex === 1) {
      newState.educationImageIntervalImageIndex = 0;
    }
    return newState;
  case START_EDUCATION_IMAGE_INTERVAL:
    newState.hasEducationImageIntervalStarted = true;
    return newState;
  case SET_EDUCATION_IMAGE_INTERVAL_INDEX:
    return {...state, educationImageIntervalImageIndex: action.payload};
  default:
    return state;
  }
}

export default EducationImageIntervalReducer;