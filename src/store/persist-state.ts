import { Middleware } from 'redux';
import { COLLECTION_SAVED_STATE } from '@/constants';
import i18n from '@/locales/i18n';
import { setTheme } from '@/utils';
import { State } from './types';

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

export const saveState: Middleware<{}, State> = storeAPI => next => action => {
  const oldState = storeAPI.getState();
  const result = next(action);
  const newState = storeAPI.getState();

  if (oldState !== newState) {
    saveItemInStorage(COLLECTION_SAVED_STATE, newState);
  }

  return result;
};

export const loadState = () => {
  try {
    const persistedState: State | undefined = getStoredItem(COLLECTION_SAVED_STATE);
    if (!persistedState) {
      return undefined;
    }
    setTheme(persistedState.settings.currentTheme);
    i18n.changeLanguage(persistedState.settings.currentLanguage);
    return persistedState;
  } catch (error) {
    return undefined;
  }
};
