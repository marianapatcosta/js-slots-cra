import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { loadState, saveState } from './persist-state';
import { settingsReducer, slotMachineReducer } from './reducers';

const persistedState = loadState();

const devtoolsCompose =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  combineReducers({
    settings: settingsReducer,
    slotMachine: slotMachineReducer,
  }),
  persistedState,
  devtoolsCompose(applyMiddleware(saveState))
);
