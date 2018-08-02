export const REGISTER_CURRENT_SECTION_INDEX = 'REGISTER_CURRENT_SECTION_INDEX';
export const MOVE_ONE_SECTION_TO_LEFT = 'MOVE_ONE_SECTION_TO_LEFT';
export const MOVE_ONE_SECTION_TO_RIGHT = 'MOVE_ONE_SECTION_TO_RIGHT';

export const registerCurrentSectionIndex = currentSectionIndex => ({
  type: REGISTER_CURRENT_SECTION_INDEX,
  payload: currentSectionIndex
});

export const moveOneSectionToLeft = () => ({
  type: MOVE_ONE_SECTION_TO_LEFT
});

export const moveOneSectionToRight = () => ({
  type: MOVE_ONE_SECTION_TO_RIGHT
});