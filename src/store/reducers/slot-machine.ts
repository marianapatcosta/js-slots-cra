import { DEFAULT_BET, INITIAL_CREDITS } from '@/game-configs';
import { PayLine, Position, SlotScreenResult } from '@/types';
import {
  AUTO_SPIN_STATE_CHANGED,
  SHOW_PAY_LINES_STATE_CHANGED,
  GAME_RESET,
  SPAN,
  SPIN_ENDED,
  RESET_MODAL_DISMISSED,
  BET_UPDATED,
  NEW_SPIN_PREPARED,
} from '../action-types';

export interface State {
  readonly credits: number;
  readonly freeSpins: number;
  readonly resetGameOnMount: boolean | null;
  readonly bet: number;
  readonly isSpinning: boolean;
  readonly isAutoSpinOn: boolean;
  readonly hasOngoingGame: boolean;
  readonly showPayLines: boolean;
  readonly bonusFactor: number;
  readonly winPayLines: PayLine[];
  readonly bonusWildcardsPositions: Position[];
}

export const initialState: State = {
  credits: INITIAL_CREDITS,
  bet: DEFAULT_BET,
  freeSpins: 0,
  isAutoSpinOn: false,
  isSpinning: false,
  showPayLines: false,
  hasOngoingGame: false,
  resetGameOnMount: null,
  winPayLines: [],
  bonusFactor: 0,
  bonusWildcardsPositions: [],
};

export type Action =
  | { type: typeof BET_UPDATED; payload: number }
  | { type: typeof SPAN }
  | { type: typeof SPIN_ENDED; payload: { slotResult: SlotScreenResult; bonusWildcardsPositions: Position[]; } }
  | { type: typeof AUTO_SPIN_STATE_CHANGED; payload: boolean }
  | { type: typeof SHOW_PAY_LINES_STATE_CHANGED; payload: boolean }
  | { type: typeof GAME_RESET }
  | { type: typeof NEW_SPIN_PREPARED }
  | { type: typeof RESET_MODAL_DISMISSED; payload: boolean };

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case BET_UPDATED:
      if (action.payload > state.credits || action.payload < 0) {
        return state;
      }

      return {
        ...state,
        bet: action.payload,
      };
    case SPAN:
      const hasFreeSpins: boolean = state.freeSpins > 0;
      const updatedFreeSpins = hasFreeSpins ? state.freeSpins - 1 : state.freeSpins;
      const updatedCredits = !hasFreeSpins ? state.credits - state.bet : state.credits;

      return {
        ...state,
        freeSpins: updatedFreeSpins,
        credits: updatedCredits,
        isSpinning: true,
        showPayLines: false,
        hasOngoingGame: true,
      };
    case SPIN_ENDED:
      const { slotResult: { winAmount, freeSpins, winPayLines, bonusFactor }, bonusWildcardsPositions } = action.payload;
      let winnings: number =  winAmount * state.bet;
      if (!!bonusFactor) {
        winnings *= bonusFactor;
      }

      return {
        ...state,
        isSpinning: false,
        credits: state.credits + winnings,
        freeSpins: state.freeSpins + freeSpins,
        winPayLines,
        bonusFactor,
        showPayLines: !!winPayLines.length,
        bonusWildcardsPositions
      };
    case AUTO_SPIN_STATE_CHANGED:
      return {
        ...state,
        isAutoSpinOn: action.payload,
      };
    case SHOW_PAY_LINES_STATE_CHANGED:
      return {
        ...state,
        showPayLines: action.payload,
      };
    case NEW_SPIN_PREPARED:
      return {
        ...state,
        showPayLines: false,
        bonusFactor: 0,
        winPayLines: [],
        bonusWildcardsPositions: [],
      };
    case GAME_RESET:
      return {
        ...initialState,
        resetGameOnMount: state.resetGameOnMount,
      };
    case RESET_MODAL_DISMISSED:
      const resetGameOnMount: boolean = action.payload;
      const newState: State = resetGameOnMount ? initialState : state;
      return {
        ...newState,
        resetGameOnMount,
      };
    default:
      return state;
  }
};
