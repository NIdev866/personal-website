export const START_EDUCATION_IMAGE_INTERVAL = 'START_EDUCATION_IMAGE_INTERVAL';
export const SWITCH_EDUCATION_IMAGE = 'SWITCH_EDUCATION_IMAGE';
export const SET_EDUCATION_IMAGE_INTERVAL_INDEX = 'SET_EDUCATION_IMAGE_INTERVAL_INDEX';

let educationImageInterval = null;

export const startEducationImageInterval = () => dispatch => {
  dispatch({
    type: START_EDUCATION_IMAGE_INTERVAL,
    payload: true
  });
  educationImageInterval = setInterval(() => {
    dispatch(switchEducationImage());
  }, 6000);
};

export const switchEducationImage = () => ({
  type: SWITCH_EDUCATION_IMAGE
});

export const setEducationImageIntervalIndex = newIndex => dispatch => {
  clearInterval(educationImageInterval);
  educationImageInterval = setInterval(() => {
    dispatch(switchEducationImage());
  }, 6000);
  dispatch({
    type: SET_EDUCATION_IMAGE_INTERVAL_INDEX,
    payload: newIndex
  });
};