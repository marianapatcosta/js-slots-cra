import { createContext } from 'react';
import { ToastData } from '@/types';

export interface ToastContextData {
  addToast: (newToast: ToastData) => void;
}

export const ToastContext = createContext({} as ToastContextData);
