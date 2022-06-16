import React from 'react';

export const enum Locale {
  EN = 'en-UK',
  PT = 'pt-PT',
}

export const enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ToastType {
  ALERT = 'alert',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export enum ModalType {
  ABOUT = 'about',
  RESET = 'reset',
  SETTINGS = 'settings',
}

export type ToastData = { message: string; type: ToastType | undefined };

export type InputData = { value: string; caption: string };

export type ModalData = { title: string; description: string; component: string };

export type Position = {
  reel: number;
  row: number;
};

export enum SymbolType {
  ANGULAR = 'angular',
  BABYLONJS = 'babylonJs',
  CYPRESS = 'cypress',
  JAVASCRIPT = 'javascript',
  JEST = 'jest',
  MOBX = 'mobx',
  PINIA = 'pinia',
  PIXIJS = 'pixiJs',
  REACT = 'react',
  REDUX = 'redux',
  TYPESCRIPT = 'typescript',
  VITE = 'vite',
  VUE = 'vue',
}

export type Symbol = {
  id: string;
  type: SymbolType;
  icon: React.FC<{ animate?: boolean }>;
  frequency?: number;
  winFactor?: number[];
};

export enum PayLineType {
  PL_1 = 'payLine1',
  PL_2 = 'payLine2',
  PL_3 = 'payLine3',
  PL_4 = 'payLine4',
  PL_5 = 'payLine5',
  PL_6 = 'payLine6',
  PL_7 = 'payLine7',
  PL_8 = 'payLine8',
  PL_9 = 'payLine9',
}

export type PayLine = {
  type: PayLineType;
  color: Color;
  positions: Position[];
};

export type PayLineResult = {
  currentSymbolType: SymbolType;
  numberOfSymbolsInLine: number;
  initialPositionIndex: number;
};

export type SlotScreenResult = {
  winAmount: number;
  freeSpins: number;
  bonusFactor: number;
  winPayLines: PayLine[];
};

export enum Color {
  PINK = '#fe4495',
  BLUE = '#37a8ee',
  GREEN = '#008000',
  RED = '#b33030',
  YELLOW = '#f1c40f',
  ORANGE = '#fd891c',
  DARK_BLUE = '#1e64af',
  LIGHT_GREEN = '#80ca80',
  PURPLE = '#3f1347',
  GREY = '#d8d8d8',
}
