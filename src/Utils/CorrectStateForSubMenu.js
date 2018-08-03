const CorrectStateForSubMenu = (state, SubMenuOpened, Section) => {
  switch(Section) {
  case 'Experience':
    if(SubMenuOpened === 1) {
      return state.experienceSubMenuWrapperHeight;
    }
    return 0;
  case 'Portfolio':
    if(SubMenuOpened === 2) {
      return state.portfolioSubMenuWrapperHeight;
    }
    return 0;
  case 'Education':
    if(SubMenuOpened === 4) {
      return state.educationSubMenuWrapperHeight;
    }
    return 0;
  default:
    return 0;
  }
};

export default CorrectStateForSubMenu;