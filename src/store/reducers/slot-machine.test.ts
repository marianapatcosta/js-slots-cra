import { DEFAULT_BET, INITIAL_CREDITS, PAY_LINES_METADATA } from '@/game-configs';
import { PayLine } from '@/types';
import { BET_UPDATED, SPAN, SPIN_ENDED } from '../action-types';
import { State, reducer as slotMachineReducer } from './slot-machine';

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

const winPayLines: PayLine[] = [{ ...PAY_LINES_METADATA.payLine1 }];

describe('Slot machine reducer', () => {
  describe('update bet', () => {
    it('should update bet amount', () => {
      const payload: number = 5;
      const action = { type: BET_UPDATED, payload } as const;
      const state = slotMachineReducer(initialState, action);

      expect(state.bet).toBe(payload);
      expect(state).not.toBe(initialState);
    });

    it('should not update bet if bet > credits', () => {
      const payload: number = initialState.credits + 5;
      const action = { type: BET_UPDATED, payload } as const;
      const state = slotMachineReducer(initialState, action);

      expect(state.bet).toBe(initialState.bet);
      expect(state).toBe(initialState);
    });
  });

  describe('spin the reels', () => {
    it('should update credits and isSpinning state on reels spinning', () => {
      const action = { type: SPAN } as const;
      const state = slotMachineReducer(initialState, action);
      expect(state.credits).toBe(initialState.credits - state.bet);
      expect(state.isSpinning).toBe(true);
      expect(state).not.toBe(initialState);
    });

    it('should not update credits and update isSpinning and freeSpinnings state on reels spinning with freeSpinings > 0', () => {
      const actions = [
        { type: SPAN },
        {
          type: SPIN_ENDED,
          payload: {
            winAmount: 30,
            freeSpins: 10,
            winPayLines: winPayLines,
            losePayLines: [] as PayLine[],
          },
        },
        { type: SPAN },
      ] as const;
      const state = actions.reduce(slotMachineReducer, initialState);
      expect(state.credits).toBe(initialState.credits - 1 + 30); // -1 from 1st SPAN; +30 from winAmount
      expect(state.freeSpins).toBe(initialState.freeSpins + 10 - 1);
      expect(state.isSpinning).toBe(true);
      expect(state).not.toBe(initialState);
    });
  });

  describe('end of reels spinning', () => {
    it('when winAmount is 0 change the credits nor winPayLines in state', () => {
      const action = {
        type: SPIN_ENDED,
        payload: {
          winAmount: 0,
          freeSpins: 0,
          winPayLines: [] as PayLine[],
          losePayLines: [] as PayLine[],
        },
      } as const;
      const state = slotMachineReducer(initialState, action);
      expect(state.credits).toBe(initialState.credits);
      expect(state.winPayLines).toEqual(initialState.winPayLines);
      expect(state.isSpinning).toBe(false);
    });
  });
});
