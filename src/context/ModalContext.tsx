import { createContext } from 'react';
import { ModalType } from '@/types';

export interface ModalContextData {
  modalType: ModalType | null;
  modalProps?: { hasNoCredits: boolean } | null;
  openModal: (modalType: ModalType, modalProps?: { hasNoCredits: boolean }) => void;
  closeModal: () => void;
}

export const ModalContext = createContext({} as ModalContextData);
