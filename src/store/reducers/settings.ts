import {
  SOUND_STATE_CHANGED,
  MUSIC_STATE_CHANGED,
  THEME_CHANGED,
  LANGUAGE_CHANGED,
} from '@/store/action-types';
import { Locale, Theme } from '@/types';
import i18n from '@/locales/i18n';
import { setTheme } from '@/utils';

export interface State {
  readonly isSoundOn: boolean;
  readonly isMusicOn: boolean;
  readonly currentTheme: Theme;
  readonly currentLanguage: Locale;
}

const initialState: State = {
  isSoundOn: true,
  isMusicOn: true,
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT,
  currentLanguage: (window.navigator.language as Locale) || Locale.EN,
};

export type Action =
  | { type: typeof SOUND_STATE_CHANGED; payload: boolean }
  | { type: typeof MUSIC_STATE_CHANGED; payload: boolean }
  | { type: typeof THEME_CHANGED; payload: Theme }
  | { type: typeof LANGUAGE_CHANGED; payload: Locale };

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case SOUND_STATE_CHANGED:
      return {
        ...state,
        isSoundOn: action.payload,
      };
    case MUSIC_STATE_CHANGED:
      return {
        ...state,
        isMusicOn: action.payload,
      };
    case THEME_CHANGED:
      setTheme(action.payload);
      return {
        ...state,
        currentTheme: action.payload,
      };
    case LANGUAGE_CHANGED:
      i18n.changeLanguage(action.payload);
      return {
        ...state,
        currentLanguage: action.payload,
      };
    default:
      return state;
  }
};
