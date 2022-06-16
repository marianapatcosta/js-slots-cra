import { HTMLAttributes, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { State } from '@/store/types';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { ButtonIcon, SlotHeader } from '@/components';
import { CloseSvg } from '@/assets/svg';
import { BubblePressSound } from '@/assets/sounds';
import styles from './styles.module.scss';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  showModal: boolean;
  children: ReactNode;
  onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, showModal, children, onCloseModal }) => {
  const element =
    (document.getElementById('modal') as HTMLElement) || document.createElement('div');
  const modalRef = useRef<HTMLDivElement>(null);
  const [t] = useTranslation();
  const isSoundOn = useSelector((state: State) => state.settings.isSoundOn);
  const bubblePressSound: HTMLAudioElement = new Audio(BubblePressSound);

  const ModalContent = () => (
    <div
      ref={modalRef}
      className={styles['modal__overlay']}
      role="dialog"
      aria-labelledby={t(title)}
      aria-describedby={t(description)}
      aria-hidden={!showModal}
      onClick={onCloseModal}
    >
      <div className={styles['modal__content']} onClick={e => e.stopPropagation()}>
        <header className={styles['modal__header']}>
          <SlotHeader title={t(title)} />
          <ButtonIcon
            icon={CloseSvg}
            aria-label={t('general.close')}
            buttonSound={isSoundOn ? bubblePressSound : null}
            onClick={onCloseModal}
          />
        </header>
        <main className={styles['modal__main']}>{children}</main>
      </div>
    </div>
  );
  return (
    <CSSTransition
      in={showModal}
      timeout={200}
      unmountOnExit
      classNames={{
        enterActive: styles['modal__overlay-enter-active'],
        enterDone: styles['modal__overlay-enter-done'],
        exitActive: styles['modal__overlay-exit-active'],
      }}
      nodeRef={modalRef}
    >
      <>{createPortal(<ModalContent />, element)}</>
    </CSSTransition>
  );
};

export { Modal };
