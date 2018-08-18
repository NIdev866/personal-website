import MainMenuOpacity from '../Utils/MainMenuOpacity';

it('returns 100 always when main menu is open, test case (1)',() =>
  expect(MainMenuOpacity(true, 30)).toBe(100)
);

it('returns 100 always when main menu is open, test case (2)',() =>
  expect(MainMenuOpacity(true, 65)).toBe(100)
);

it('returns 0 in case if zoomOutPercentage is null',() =>
  expect(MainMenuOpacity(false, null)).toBe(0)
);

it('returns 1/100 of zoomOutPercentage in case main menu is not fully opened yet, test case (1)',() =>
  expect(MainMenuOpacity(false, 53)).toBe(0.53)
);

it('returns 1/100 of zoomOutPercentage in case main menu is not fully opened yet, test case (2)',() =>
  expect(MainMenuOpacity(false, 44)).toBe(0.44)
);