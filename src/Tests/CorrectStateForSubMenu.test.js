import CorrectStateForSubMenu from '../Utils/CorrectStateForSubMenu';

const state = {
  experienceSubMenuWrapperHeight: 50,
  portfolioSubMenuWrapperHeight: 40,
  educationSubMenuWrapperHeight: 30
};

it('returns state.experienceSubMenuWrapperHeight if subMenuOpened is 1 and Section is Experience',() =>
  expect(CorrectStateForSubMenu(state, 1, 'Experience')).toBe(50)
);

it('returns state.portfolioSubMenuWrapperHeight if subMenuOpened is 2 and Section is Portfolio',() =>
  expect(CorrectStateForSubMenu(state, 2, 'Portfolio')).toBe(40)
);

it('returns state.educationSubMenuWrapperHeight if subMenuOpened is 4 and Section is Education',() =>
  expect(CorrectStateForSubMenu(state, 4, 'Education')).toBe(30)
);