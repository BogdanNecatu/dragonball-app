import { describe, expect, it } from 'vitest';
import { Transformation } from '../types';
import { parseKi, sortTransformationsByKi } from './useCharacterDetail.utils';

const dummyTransformations: Transformation[] = [
  {
    id: 1,
    name: 'Base',
    image: 'https://dummyimage.com/base.jpg',
    ki: '500 Thousand',
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Super Saiyan',
    image: 'https://dummyimage.com/ssj.jpg',
    ki: '5 Million',
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Super Saiyan 2',
    image: 'https://dummyimage.com/ssj2.jpg',
    ki: '7 Million',
    deletedAt: null,
  },
  {
    id: 4,
    name: 'Super Saiyan Blue',
    image: 'https://dummyimage.com/ssjblue.jpg',
    ki: '1 Billion',
    deletedAt: null,
  },
  {
    id: 5,
    name: 'Ultra Instinct',
    image: 'https://dummyimage.com/ui.jpg',
    ki: '2 Billion',
    deletedAt: null,
  },
];

const dummyTransformations_2: Transformation[] = [
  {
    id: 1,
    name: 'Base',
    image: 'https://dummyimage.com/base.jpg',
    ki: 'not a number',
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Super Saiyan',
    image: 'https://dummyimage.com/ssj.jpg',
    ki: '1 Million',
    deletedAt: null,
  },
];

describe('parseKi', () => {
  it('parses ki with units correctly', () => {
    expect(parseKi('1 Million')).toBe(1_000_000);
    expect(parseKi('2 Billion')).toBe(2_000_000_000);
    expect(parseKi('1.5 Trillion')).toBe(1.5e12);
    expect(parseKi('3.2 Quadrillion')).toBe(3.2e15);
  });

  it('parses raw numbers without units correctly', () => {
    expect(parseKi('100000')).toBe(100000);
    expect(parseKi('1.000.000')).toBe(1000000); // European style
    expect(parseKi('2,000,000')).toBe(2000000); // American style
    expect(parseKi('15.000.000.000')).toBe(15000000000); // Big European style
  });

  it('returns 0 for invalid or empty input', () => {
    expect(parseKi('invalid string')).toBe(0);
    expect(parseKi('')).toBe(0);
  });
});

describe('sortTransformationsByKi', () => {
  it('sorts transformations by ki ascending', () => {
    const sorted = sortTransformationsByKi(dummyTransformations);

    expect(sorted.map((t) => t.ki)).toEqual(['500 Thousand', '5 Million', '7 Million', '1 Billion', '2 Billion']);
  });

  it('handles empty transformations array', () => {
    expect(sortTransformationsByKi([])).toEqual([]);
  });

  it('handles invalid ki values gracefully', () => {
    const sorted = sortTransformationsByKi(dummyTransformations_2);

    expect(sorted.map((t) => t.ki)).toEqual([
      'not a number', // stays first because parsed as 0
      '1 Million',
    ]);
  });
});
