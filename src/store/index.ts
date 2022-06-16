import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import i18n from '@/locales/i18n';
import { setTheme } from '@/utils';
import { loadState, saveState } from './persist-state';
import { settingsReducer, slotMachineReducer } from './reducers';
import type { State } from './types';

const persistedState: State | undefined = loadState();

const devtoolsCompose =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  combineReducers({
    settings: settingsReducer,
    slotMachine: slotMachineReducer,
  }),
  persistedState,
  devtoolsCompose(applyMiddleware(saveState))
);

// if no persisted state, set theme and language according to user's system preferences (default state of store)
if (!persistedState) {
  const state: State = store.getState();
  setTheme(state.settings.currentTheme);
  i18n.changeLanguage(state.settings.currentLanguage);
}

export { store };
