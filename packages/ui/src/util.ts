// Round to division so
// - division: 2 = round to 0.5
// - division: 4 = round to 0.25
export const roundToDivision = (num: number, division: number) =>
  Math.round(num * division) / division;

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
