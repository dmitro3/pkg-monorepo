/* eslint-disable no-undef */
// write me a test for the toDecimals function

import { toDecimals } from '../../lib/utils/web3';

describe('toDecimals', () => {
  it('should return a number with 2 decimal places', () => {
    expect(toDecimals(1)).toBe(1.0);
    expect(toDecimals(1.1)).toBe(1.1);
    expect(toDecimals(1.11)).toBe(1.11);
  });
});
