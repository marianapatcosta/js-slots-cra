import { SYMBOLS_METADATA } from './game-configs';
import type { Position, SlotScreenResult, Symbol } from './types';
import { getRandomPosition, getScreenResult, isPositionFilled } from './game-utils';

// MATCH PAY LINES 2 and 3 with 3 React symbol (returns winAmount 2)
const SCREEN_1: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2, 3, 6 and 7 with 5, 4 and 3 React symbols, respectively (returns winAmount 27)
const SCREEN_2: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 Scatter and 3 with 3 React (returns winAmount 7, 10 freeSpins)
const SCREEN_3: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with 3 Scatter (w/ match before wildcard) and 3 with 3 React (returns winAmount 7, 10 freeSpins)
const SCREEN_4: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with Explosive (returns winAmount -6)
const SCREEN_5: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// NO MATCHED PAY LINES
const SCREEN_6: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vue, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 1, 4, and 5 with  4 matching positions won with Bonus wildcards (returns winAmount 217)
const SCREEN_7: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.typescript],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vue, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with 3 Scatter (w/ match after wildcard) and 3 with 3 React (returns winAmount 7, 10 freeSpins)
const SCREEN_8: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with 3 Scatter (w/ match with wildcard in the middle) and 3 with 3 React (returns winAmount 7, 10 freeSpins)
const SCREEN_9: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINE 3 with 3 React (returns winAmount 1)
const SCREEN_10: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vue, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

describe('getRandomPosition', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.724343);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  it('should return { reel: 3, row: 2 } when Math.random returns 0.724343', () => {
    expect(getRandomPosition()).toEqual({ reel: 3, row: 2 });
  });
});

describe('isPositionFilled', () => {
  const positions: Position[] = [
    { reel: 3, row: 2 },
    { reel: 1, row: 2 },
  ];
  it('should return false when passing { reel: 1, row: 1 } as position', () => {
    expect(isPositionFilled(positions, { reel: 1, row: 1 })).toBe(false);
  });

  it('should return false when passing { reel: 3, row: 2 } as position', () => {
    expect(isPositionFilled(positions, { reel: 3, row: 2 })).toBe(true);
  });
});

describe('getScreenResult', () => {
  it('should have winAmount of 2 and 2 winPayLines when SCREEN_1 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_1 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 2 });
    expect(results.winPayLines).toHaveLength(2);
  });

  it('should have winAmount of 27 and 4 winPayLines when SCREEN_2 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_2 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 27 });
    expect(results.winPayLines).toHaveLength(4);
  });

  it('should have winAmount of 7, freeSpins of 10 and 2 winPayLines when SCREEN_3 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_3 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 7, freeSpins: 10 });
    expect(results.winPayLines).toHaveLength(2);
  });

  it('should have winAmount of 7, freeSpins of 10 and 2 winPayLines (w/ wildcard) when SCREEN_4 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_4 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 7, freeSpins: 10 });
    expect(results.winPayLines).toHaveLength(2);
  });

  it('should have winAmount of 7, freeSpins of 10 and 2 winPayLines (w/ wildcard) when SCREEN_8 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_8 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 7, freeSpins: 10 });
    expect(results.winPayLines).toHaveLength(2);
  });

  it('should have winAmount of 7, freeSpins of 10 and 2 winPayLines (w/ wildcard) when SCREEN_9 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_9 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 7, freeSpins: 10 });
    expect(results.winPayLines).toHaveLength(2);
  });

  it('should have winAmount of 1, and 1winPayLines (w/ wildcard) when SCREEN_10 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_10 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 1 });
    expect(results.winPayLines).toHaveLength(1);
  });

  it('should have winAmount of 8 and bonusFactor of 3 when SCREEN_5 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_5 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 8, bonusFactor: 3 });
    expect(results.winPayLines).toHaveLength(1);
  });

  it('should not return any results when SCREEN_6 is passed as value (no matches)', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_6 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 0, freeSpins: 0, bonusFactor: 0 });
    expect(results.winPayLines).toHaveLength(0);
  });

  it('should have winAmount of 213, and 3 winPayLines (w/ bonus wildcards) when SCREEN_7 is passed as value', () => {
    const results: SlotScreenResult = getScreenResult(SCREEN_7 as Symbol[][]);
    expect(results).toMatchObject({ winAmount: 213, freeSpins: 0 });
    expect(results.winPayLines).toHaveLength(3);
  });
});
