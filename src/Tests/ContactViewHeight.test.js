import ContactViewHeight from '../Utils/ContactViewHeight';

it('returns 0 if distanceUp is falsy but not exactly 0',() =>
  expect(ContactViewHeight(null)).toBe(0)
);

it('returns 0 if distanceUp is exactly 0',() =>
  expect(ContactViewHeight(0)).toBe(0)
);

it('returns more than 0 if distanceUp is provided as a number greater than 0',() =>
  expect(ContactViewHeight(60)).toBeGreaterThan(0)
);

it('returns 0 if distanceUp is truthy but of a wrong type',() =>
  expect(ContactViewHeight('test')).toBe(0)
);

it('returns 0 if distanceUp is greater than 0 but less than 20',() =>
  expect(ContactViewHeight(10)).toBe(0)
);

it('returns "distanceUp-20" if distanceUp is greater than 20',() =>
  expect(ContactViewHeight(30)).toBe(10)
);