import type { Theme } from '@/types';

export const setTheme = (theme: Theme): void =>
  document.documentElement.setAttribute('theme', theme);

export const remToPixel = (value: number): number => value * 16;

// returns a number between min and max , inclusive
export const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const deepClone = <T>(objectToCopy: T): T => {
  if (typeof objectToCopy !== 'object' || objectToCopy === null) {
    return objectToCopy;
  }

  if (objectToCopy instanceof Date) {
    return new Date(objectToCopy) as any;
  }

  if (objectToCopy instanceof RegExp) {
    return new RegExp(objectToCopy) as any;
  }

  if (Array.isArray(objectToCopy)) {
    const copiedObject = [] as Array<unknown>;

    for (let index = 0; index < objectToCopy.length; index++) {
      copiedObject.push(deepClone(objectToCopy[index]));
    }

    return copiedObject as any;
  }

  const copiedObject = {} as { [key: string]: unknown };

  for (const [key, value] of Object.entries(objectToCopy)) {
    copiedObject[key] = deepClone(value);
  }

  return copiedObject as unknown as T;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = getRandomNumber(0, index);
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
};
