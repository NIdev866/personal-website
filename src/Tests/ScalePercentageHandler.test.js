import ScalePercentageHandler from '../Utils/ScalePercentageHandler';

it('does not scale when zoomOutPercentage provided is of value 0',() =>
  expect(ScalePercentageHandler(0)).toBe('scale(1)')
);

it('does not scale when zoomOutPercentage provided is of wrong value but falsy',() =>
  expect(ScalePercentageHandler(null)).toBe('scale(1)')
);

it('returns minimal scale if zoomOutPercentage is larger than 90, test case (1)',() =>
  expect(ScalePercentageHandler(93)).toBe('scale(0.87)')
);

it('returns minimal scale if zoomOutPercentage is larger than 90, test case (2)',() =>
  expect(ScalePercentageHandler(100)).toBe('scale(0.87)')
);

it('returns calculated scale based on zoomOutPercentage given',() =>
  expect(ScalePercentageHandler(90)).toBe(`scale(0.${Math.floor(100 - (90/8))})`)
);