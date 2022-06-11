import { DEFAULT_BET, INITIAL_CREDITS } from '@/game-configs';
import { PayLine, Position, SlotScreenResult } from '@/types';
import {
  AUTO_SPIN_STATE_CHANGED,
  SHOW_PAY_LINES_STATE_CHANGED,
  CREDITS_DECREASED,
  CREDITS_INCREASED,
  GAME_RESET,
  SPAN,
  SPIN_ENDED,
  RESET_MODAL_DISMISSED,
  BET_UPDATED,
  GAME_LEFT,
  NEW_SPIN_PREPARED,
  BONUS_WILD_CARDS_WON,
} from '../action-types';

export interface State {
  readonly credits: number;
  readonly bet: number;
  readonly freeSpins: number;
  readonly isSpinning: boolean;
  readonly isAutoSpinOn: boolean;
  readonly hasOngoingGame: boolean;
  readonly resetGameOnMount: boolean | null;
  readonly showPayLines: boolean;
  readonly winPayLines: PayLine[];
  readonly losePayLines: PayLine[];
  readonly bonusWildcardsPositions: Position[];
}

const initialState: State = {
  credits: INITIAL_CREDITS,
  bet: DEFAULT_BET,
  freeSpins: 0,
  isAutoSpinOn: false,
  isSpinning: false,
  showPayLines: false,
  hasOngoingGame: false,
  resetGameOnMount: null,
  winPayLines: [],
  losePayLines: [],
  bonusWildcardsPositions: [],
};

export type Action =
  | { type: typeof CREDITS_DECREASED; payload: number }
  | { type: typeof CREDITS_INCREASED; payload: number }
  | { type: typeof BET_UPDATED; payload: number }
  | { type: typeof SPAN }
  | { type: typeof SPIN_ENDED; payload: SlotScreenResult }
  | { type: typeof AUTO_SPIN_STATE_CHANGED; payload: boolean }
  | { type: typeof SHOW_PAY_LINES_STATE_CHANGED; payload: boolean }
  | { type: typeof GAME_RESET }
  | { type: typeof GAME_LEFT }
  | { type: typeof NEW_SPIN_PREPARED }
  | { type: typeof BONUS_WILD_CARDS_WON; payload: Position[] }
  | { type: typeof RESET_MODAL_DISMISSED; payload: boolean };

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case CREDITS_DECREASED:
      return {
        ...state,
        credits: state.credits - action.payload,
      };
    case CREDITS_INCREASED:
      return {
        ...state,
        credits: state.credits + action.payload,
      };
    case BET_UPDATED:
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
        losePayLines: [],
        winPayLines: [],
        showPayLines: false,
        hasOngoingGame: true,
        bonusWildcardsPositions: [],
      };
    case SPIN_ENDED:
      const { winAmount, freeSpins, winPayLines, losePayLines } = action.payload;
      const winnings: number = state.credits + winAmount * state.bet;
      return {
        ...state,
        isSpinning: false,
        credits: winnings > 0 ? winnings : 0,
        freeSpins: state.freeSpins + freeSpins,
        winPayLines,
        losePayLines,
        showPayLines: !!winPayLines.length || !!losePayLines.length,
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
    case BONUS_WILD_CARDS_WON:
      return {
        ...state,
        bonusWildcardsPositions: action.payload,
      };
    case NEW_SPIN_PREPARED:
      return {
        ...state,
        showPayLines: false,
        winPayLines: [],
        losePayLines: [],
      };
    case GAME_LEFT:
      return {
        ...state,
        isSpinning: false,
        isAutoSpinOn: false,
        showPayLines: false,
        bonusWildcardsPositions: [],
      };
    case GAME_RESET:
      return {
        ...initialState,
        resetGameOnMount: state.resetGameOnMount,
      };
    case RESET_MODAL_DISMISSED:
      return {
        ...state,
        resetGameOnMount: action.payload,
      };
    default:
      return state;
  }
};
