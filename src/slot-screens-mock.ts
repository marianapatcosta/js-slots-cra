import { SYMBOLS_METADATA } from './game-configs';
import { Symbol } from './types';

// MATCH PAY LINES 2 and 3 with 3 React symbol (returns winAmount 2)
export const SCREEN_1: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2, 3, 6 and 7 with 5, 4 and 3 React symbols, respectively (returns winAmount 27)
export const SCREEN_2: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 Scatter and 3 with 3 React (returns winAmount 7, 10 freeSpins)
export const SCREEN_3: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with 3 Scatter (w/ wildcard) and 3 with 3 React (returns winAmount 7, 10 freeSpins)
export const SCREEN_4: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.javascript, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// MATCH PAY LINES 2 with Explosive (returns winAmount -6)
export const SCREEN_5: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

// NO MATCHED PAY LINES
export const SCREEN_6: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.vue, SYMBOLS_METADATA.angular],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vue, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.pinia, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];

export const SCREEN_7: Omit<Symbol, 'id'>[][] = [
  [SYMBOLS_METADATA.vite, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.typescript],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.vite],
  [SYMBOLS_METADATA.vue, SYMBOLS_METADATA.cypress, SYMBOLS_METADATA.react],
  [SYMBOLS_METADATA.pixiJs, SYMBOLS_METADATA.typescript, SYMBOLS_METADATA.redux],
  [SYMBOLS_METADATA.react, SYMBOLS_METADATA.mobx, SYMBOLS_METADATA.react],
];
