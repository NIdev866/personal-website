import NextViewIsInNextSection from '../Utils/NextViewIsInNextSection';

const eachSectionFirstPageIndex = [
  0, 1, 3, 6, 7, 9
];

it('returns false in case next view is still in the same section, test case (1)',() =>
  expect(NextViewIsInNextSection(5, 2, eachSectionFirstPageIndex)).toBe(false)
);

it('returns false in case next view is still in the same section, test case (2)',() =>
  expect(NextViewIsInNextSection(8, 4, eachSectionFirstPageIndex)).toBe(false)
);

it('returns true in case next view is in one section after current section, test case (1)',() =>
  expect(NextViewIsInNextSection(3, 1, eachSectionFirstPageIndex)).toBe(true)
);

it('returns true in case next view is in one section after current section, test case (2)',() =>
  expect(NextViewIsInNextSection(6, 2, eachSectionFirstPageIndex)).toBe(true)
);