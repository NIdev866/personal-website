export const REGISTER_CURRENT_VIEW_INDEX = 'REGISTER_CURRENT_VIEW_INDEX';
export const MOVE_ONE_PAGE_TO_LEFT = 'MOVE_ONE_PAGE_TO_LEFT';
export const MOVE_ONE_PAGE_TO_RIGHT = 'MOVE_ONE_PAGE_TO_RIGHT';

export const registerCurrentViewIndex = currentViewIndex => ({
  type: REGISTER_CURRENT_VIEW_INDEX,
  payload: currentViewIndex
});

export const moveOnePageToLeft = () => ({
  type: MOVE_ONE_PAGE_TO_LEFT
});

export const moveOnePageToRight = () => ({
  type: MOVE_ONE_PAGE_TO_RIGHT
});