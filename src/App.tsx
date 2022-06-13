import { useState, useMemo, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import {
  About,
  Footer,
  Header,
  Loader,
  Modal,
  ResetGame,
  Settings,
  SlotMachine,
  Toast,
} from '@/components';
import { store } from '@/store';
import { ModalContext } from '@/context/ModalContext';
import { ModalType, ToastData, ToastType } from '@/types';
import { ToastContext } from '@/context/ToastContext';
import { TOAST_OFFSET, LOADING_TIME } from '@/constants';
import styles from './index.module.scss';

const MODALS_DATA = {
  [ModalType.ABOUT]: {
    title: 'about.title',
    description: 'about.description',
    component: About,
  },
  [ModalType.SETTINGS]: {
    title: 'settings.title',
    description: 'settings.description',
    component: Settings,
  },
  [ModalType.RESET]: {
    title: 'reset.title',
    description: 'reset.description',
    component: ResetGame,
  },
};

const App = () => {
  const [t] = useTranslation();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<{ hasNoCredits: boolean } | null>(null);
  const modalData = useMemo(() => (modalType ? MODALS_DATA[modalType] : null), [modalType]);
  const ModalChildren = useMemo(() => (modalData ? modalData.component : null), [modalData]);
  const openModal = (modalType: ModalType, modalProps?: { hasNoCredits: boolean }): void => {
    if (modalProps) {
      setModalProps(modalProps);
    }
    setModalType(modalType);
  };
  const closeModal = (): void => {
    setModalType(null);
    setModalProps(null);
  };

  const [toastData, setToastData] = useState<ToastData[]>([]);
  const addToast = (newToast: ToastData): void => setToastData(prevData => [...prevData, newToast]);
  const removeToast = (toastIndex: number): void =>
    setToastData(prevData => prevData.filter((_, index) => index !== toastIndex));

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onLoadEnd = (): void => setIsLoading(false);

  const trackOfflineStatus = useCallback(
    (event: Event) => {
      if (event.type === 'offline') {
        addToast({ type: ToastType.WARNING, message: t('global.offline') });
      }
    },
    [t]
  );

  useEffect(() => {
    window.addEventListener('online', trackOfflineStatus);
    window.addEventListener('offline', trackOfflineStatus);

    return () => {
      window.removeEventListener('online', trackOfflineStatus);
      window.removeEventListener('offline', trackOfflineStatus);
    };
  }, [trackOfflineStatus]);

  return (
    <Provider store={store}>
      <ModalContext.Provider value={{ modalType, modalProps, openModal, closeModal }}>
        <ToastContext.Provider value={{ addToast }}>
          {isLoading && <Loader loadingTime={LOADING_TIME} onLoadEnd={onLoadEnd} />}
          <div className={`${styles.app} ${isLoading ? styles['app--loading'] : ''}`}>
            <Header />
            <main>
              <SlotMachine />
            </main>
            <Footer />
          </div>
          <Modal
            title={modalData?.title || ''}
            description={modalData?.description || ''}
            showModal={!!modalType}
            onCloseModal={closeModal}
          >
            {ModalChildren ? <ModalChildren /> : null}
          </Modal>
          <TransitionGroup component="div">
            {toastData.map((data, index) => (
              <CSSTransition
                key={nanoid()}
                timeout={200}
                classNames={{
                  enter: styles['toast-enter'],
                  enterActive: styles['toast-enter-active'],
                  exit: styles['toast-exit'],
                  exitActive: styles['toast-exit-active'],
                }}
              >
                <Toast
                  message={data.message}
                  style={{ top: `${TOAST_OFFSET * index + 2}rem` }}
                  type={data.type}
                  onToastDismiss={() => removeToast(index)}
                  autoDismissable={true}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ToastContext.Provider>
      </ModalContext.Provider>
    </Provider>
  );
};

export default App;
