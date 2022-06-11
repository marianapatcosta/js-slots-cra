import { createContext } from 'react';

export interface ReelsContextData {
  symbolSize: number;
  onReelAnimationEnd: (reelIndex: number) => void;
  onSpinningEnd: () => void;
}

export const ReelsContext = createContext({} as ReelsContextData);
