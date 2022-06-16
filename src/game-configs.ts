import {
  AngularSvg,
  BabylonSvg,
  CypressSvg,
  JavascriptSvg,
  JestSvg,
  MobxSvg,
  PiniaSvg,
  PixijsSvg,
  ReactSvg,
  ReduxSvg,
  TypescriptSvg,
  ViteSvg,
  VueSvg,
} from '@/assets/svg';
import { Color, Symbol, SymbolType, PayLine, PayLineType } from '@/types';

const WIN_FACTORS: Readonly<{ [key: string]: number[] }> = {
  VERY_LOW: [1, 5, 20],
  LOW: [1, 8, 30],
  MEDIUM: [6, 20, 150],
  HIGH: [8, 80, 400],
  VERY_HIGH: [20, 200, 1000],
};

export const WILDCARD_METADATA: Readonly<Omit<Symbol, 'id'>> = {
  type: SymbolType.TYPESCRIPT,
  icon: TypescriptSvg,
};

export const SCATTER_METADATA: Readonly<Omit<Symbol, 'id'>> = {
  type: SymbolType.JAVASCRIPT,
  icon: JavascriptSvg,
};

export const EXPLOSIVE_METADATA: Readonly<Omit<Symbol, 'id'>> = {
  type: SymbolType.VITE,
  icon: ViteSvg,
};

export const SYMBOLS_METADATA: Readonly<{ [key in SymbolType]: Omit<Symbol, 'id'> }> = {
  [SymbolType.REACT]: {
    type: SymbolType.REACT,
    icon: ReactSvg,
    frequency: 5, // frequency per reel
    winFactor: WIN_FACTORS.VERY_LOW,
  },
  [SymbolType.REDUX]: {
    type: SymbolType.REDUX,
    icon: ReduxSvg,
    frequency: 5,
    winFactor: WIN_FACTORS.VERY_LOW,
  },
  [SymbolType.VUE]: {
    type: SymbolType.VUE,
    icon: VueSvg,
    frequency: 4,
    winFactor: WIN_FACTORS.LOW,
  },
  [SymbolType.ANGULAR]: {
    type: SymbolType.ANGULAR,
    icon: AngularSvg,
    frequency: 3,
    winFactor: WIN_FACTORS.MEDIUM,
  },
  [SymbolType.MOBX]: {
    type: SymbolType.MOBX,
    icon: MobxSvg,
    frequency: 3,
    winFactor: WIN_FACTORS.MEDIUM,
  },
  [SymbolType.PINIA]: {
    type: SymbolType.PINIA,
    icon: PiniaSvg,
    frequency: 3,
    winFactor: WIN_FACTORS.MEDIUM,
  },
  [SymbolType.PIXIJS]: {
    type: SymbolType.PIXIJS,
    icon: PixijsSvg,
    frequency: 2,
    winFactor: WIN_FACTORS.HIGH,
  },
  [SymbolType.BABYLONJS]: {
    type: SymbolType.BABYLONJS,
    icon: BabylonSvg,
    frequency: 2,
    winFactor: WIN_FACTORS.HIGH,
  },
  [SymbolType.JEST]: {
    type: SymbolType.JEST,
    icon: JestSvg,
    frequency: 1,
    winFactor: WIN_FACTORS.VERY_HIGH,
  },
  [SymbolType.CYPRESS]: {
    type: SymbolType.CYPRESS,
    icon: CypressSvg,
    frequency: 1,
    winFactor: WIN_FACTORS.VERY_HIGH,
  },
  [SymbolType.JAVASCRIPT]: {
    ...SCATTER_METADATA,
    frequency: 1,
    winFactor: WIN_FACTORS.MEDIUM,
  },
  [SymbolType.VITE]: {
    ...EXPLOSIVE_METADATA,
    frequency: 1,
    winFactor: WIN_FACTORS.HIGH,
  },
  [SymbolType.TYPESCRIPT]: {
    ...WILDCARD_METADATA,
    frequency: 0,
  },
};

export const PAY_LINES_METADATA: Readonly<{ [key in PayLineType]: PayLine }> = {
  [PayLineType.PL_1]: {
    type: PayLineType.PL_1,
    color: Color.BLUE,
    positions: [
      { reel: 0, row: 1 },
      { reel: 1, row: 1 },
      { reel: 2, row: 1 },
      { reel: 3, row: 1 },
      { reel: 4, row: 1 },
    ],
  },
  [PayLineType.PL_2]: {
    type: PayLineType.PL_2,
    color: Color.GREEN,
    positions: [
      { reel: 0, row: 0 },
      { reel: 1, row: 0 },
      { reel: 2, row: 0 },
      { reel: 3, row: 0 },
      { reel: 4, row: 0 },
    ],
  },
  [PayLineType.PL_3]: {
    type: PayLineType.PL_3,
    color: Color.PURPLE,
    positions: [
      { reel: 0, row: 2 },
      { reel: 1, row: 2 },
      { reel: 2, row: 2 },
      { reel: 3, row: 2 },
      { reel: 4, row: 2 },
    ],
  },
  [PayLineType.PL_4]: {
    type: PayLineType.PL_4,
    color: Color.PINK,
    positions: [
      { reel: 0, row: 0 },
      { reel: 1, row: 1 },
      { reel: 2, row: 2 },
      { reel: 3, row: 1 },
      { reel: 4, row: 0 },
    ],
  },
  [PayLineType.PL_5]: {
    type: PayLineType.PL_5,
    color: Color.ORANGE,
    positions: [
      { reel: 0, row: 2 },
      { reel: 1, row: 1 },
      { reel: 2, row: 0 },
      { reel: 3, row: 1 },
      { reel: 4, row: 2 },
    ],
  },
  [PayLineType.PL_6]: {
    type: PayLineType.PL_6,
    color: Color.LIGHT_GREEN,
    positions: [
      { reel: 0, row: 1 },
      { reel: 1, row: 2 },
      { reel: 2, row: 2 },
      { reel: 3, row: 2 },
      { reel: 4, row: 1 },
    ],
  },
  [PayLineType.PL_7]: {
    type: PayLineType.PL_7,
    color: Color.DARK_BLUE,
    positions: [
      { reel: 0, row: 1 },
      { reel: 1, row: 0 },
      { reel: 2, row: 0 },
      { reel: 3, row: 0 },
      { reel: 4, row: 1 },
    ],
  },
  [PayLineType.PL_8]: {
    type: PayLineType.PL_8,
    color: Color.RED,
    positions: [
      { reel: 0, row: 2 },
      { reel: 1, row: 2 },
      { reel: 2, row: 1 },
      { reel: 3, row: 0 },
      { reel: 4, row: 0 },
    ],
  },
  [PayLineType.PL_9]: {
    type: PayLineType.PL_9,
    color: Color.YELLOW,
    positions: [
      { reel: 0, row: 0 },
      { reel: 1, row: 0 },
      { reel: 2, row: 1 },
      { reel: 3, row: 2 },
      { reel: 4, row: 2 },
    ],
  },
};

export const MIN_MATCH_SEQUENCE_NUMBER: Readonly<number> = 3;

export const ROW_NUMBER: Readonly<number> = 3;
export const REELS_NUMBER: Readonly<number> = 5;

export const INITIAL_CREDITS: Readonly<number> = 100;
export const DEFAULT_BET: Readonly<number> = 1;
export const FREE_SPINS_NUMBER: Readonly<number> = 10;
export const BONUS_WILDCARDS_NUMBER: Readonly<number> = 4;

export const SYMBOL_SIZE: Readonly<number> = 5; // in rem
export const SYMBOL_SIZE_SMALL: Readonly<number> = 4; // in rem

export const MIN_SPIN_ANIMATION_DURATION: Readonly<number> = 3; // in seconds
export const MAX_SPIN_ANIMATION_DURATION: Readonly<number> = 4; // in seconds

export const ANIMATE_RESULTS_DURATION: Readonly<number> = 5000; // in milliseconds

export const LIGHTS_NUMBER: Readonly<number> = 5;
