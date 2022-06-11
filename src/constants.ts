import { InputData, Locale } from '@/types';

const DATABASE_NAME = '@js-slot-machine';
export const COLLECTION_SAVED_STATE = `${DATABASE_NAME}:savedState`;

export const DEFAULT_AUTODISMISS_TIME = 2000;
export const TOAST_OFFSET = 4;

export const LOCALES_DATA: InputData[] = [
  { value: Locale.EN, caption: 'settings.english' },
  { value: Locale.PT, caption: 'settings.portuguese' },
];

// TODO update url after deployed
export const JS_SLOTS_URL = 'https://js-slots.com';

export const LOADING_TIME: number = 3000; // in milliseconds