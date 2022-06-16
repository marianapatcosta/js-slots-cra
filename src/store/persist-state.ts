import { Middleware } from 'redux';
import { COLLECTION_SAVED_STATE } from '@/constants';
import i18n from '@/locales/i18n';
import { setTheme } from '@/utils';
import type { PersistedState, State } from './types';
import { INITIAL_CREDITS } from '@/game-configs';
import { initialState as slotMachineInitialState } from './reducers/slot-machine';
import {
  GAME_RESET,
  LANGUAGE_CHANGED,
  MUSIC_STATE_CHANGED,
  RESET_MODAL_DISMISSED,
  SOUND_STATE_CHANGED,
  SPAN,
  SPIN_ENDED,
  THEME_CHANGED,
} from './action-types';

const ACTIONS_TO_PERSIST = [
  SOUND_STATE_CHANGED,
  MUSIC_STATE_CHANGED,
  THEME_CHANGED,
  LANGUAGE_CHANGED,
  SPAN,
  SPIN_ENDED,
  GAME_RESET,
  RESET_MODAL_DISMISSED,
];

const getStoredItem = <T>(collection: string): T | undefined => {
  const storedItem = localStorage.getItem(collection);
  if (!storedItem) {
    return;
  }
  const parsedStoredItem: T = JSON.parse(storedItem);
  return parsedStoredItem;
};

const saveItemInStorage = <T>(collection: string, item: T) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.setItem(collection, stringifiedItem);
};

const getHasOnGoingGame = (persistedState: PersistedState): boolean => {
  const {
    slotMachine: { freeSpins, credits },
  } = persistedState;
  return credits !== INITIAL_CREDITS || freeSpins !== 0;
};

const getStateToPersist = (state: State): PersistedState => {
  const {
    settings,
    slotMachine: { credits, freeSpins, resetGameOnMount },
  } = state;
  return {
    settings,
    slotMachine: {
      credits,
      freeSpins,
      resetGameOnMount,
    },
  };
};

export const saveState: Middleware<{}, State> = storeAPI => next => action => {
  if (!ACTIONS_TO_PERSIST.includes(action.type)) {
    return next(action);
  }
  const oldState: State = storeAPI.getState();
  const oldPersistedState: PersistedState = getStateToPersist(oldState);
  const result = next(action);
  const newState: State = storeAPI.getState();
  const newStateToPersist: PersistedState = getStateToPersist(newState);

  if (oldPersistedState !== newStateToPersist) {
    saveItemInStorage(COLLECTION_SAVED_STATE, newStateToPersist);
  }

  return result;
};

export const loadState = (): State | undefined => {
  try {
    const persistedState: PersistedState | undefined = getStoredItem(COLLECTION_SAVED_STATE);
    if (!persistedState) {
      return undefined;
    }
    setTheme(persistedState.settings.currentTheme);
    i18n.changeLanguage(persistedState.settings.currentLanguage);
    return {
      settings: persistedState.settings,
      slotMachine: {
        ...slotMachineInitialState,
        ...persistedState.slotMachine,
        hasOngoingGame: getHasOnGoingGame(persistedState),
      },
    };
  } catch (error) {
    return undefined;
  }
};
