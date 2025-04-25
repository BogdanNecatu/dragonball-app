import { Transformation } from '../../../entities/characters/types';

export const parseKi = (kiString: string): number => {
  const units: Record<string, number> = {
    Million: 1e6,
    Billion: 1e9,
    Trillion: 1e12,
    Quadrillion: 1e15,
    Quintillion: 1e18,
    Sextillion: 1e21,
    Septillion: 1e24,
  };

  if (!kiString.includes(' ')) {
    const numeric = parseFloat(kiString.replace(/\./g, '').replace(/,/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  }

  const [numberPart, unit] = kiString.split(' ');
  const cleaned = numberPart.replace(/,/g, '');
  const base = parseFloat(cleaned);
  const multiplier = units[unit] || 1;

  return isNaN(base) ? 0 : base * multiplier;
};

export const sortTransformationsByKi = (transformations: Transformation[]): Transformation[] => {
  return transformations.slice().sort((a, b) => parseKi(a.ki) - parseKi(b.ki));
};
