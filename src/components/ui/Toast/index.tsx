import { useEffect, HTMLAttributes, forwardRef, RefAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_AUTODISMISS_TIME } from '@/constants';
import { ToastType } from '@/types';
import { AlertSvg, InfoSvg, SuccessSvg, WarningSvg } from '@/assets/svg';
import styles from './styles.module.scss';

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: ToastType;
  autoDismissable?: boolean;
  timeToAutoDismiss?: number;
  onToastDismiss: () => void;
}

const TOAST_ICONS = {
  [ToastType.ALERT]: AlertSvg,
  [ToastType.INFO]: InfoSvg,
  [ToastType.SUCCESS]: SuccessSvg,
  [ToastType.WARNING]: WarningSvg,
};

const Toast: React.FunctionComponent<ToastProps & RefAttributes<HTMLDivElement>> = forwardRef(
  (
    {
      message,
      type = ToastType.INFO,
      autoDismissable = true,
      timeToAutoDismiss = DEFAULT_AUTODISMISS_TIME,
      style,
      onToastDismiss,
    },
    ref
  ) => {
    const [t] = useTranslation();
    const Icon = TOAST_ICONS[type];

    useEffect(() => {
      if (!autoDismissable) {
        return;
      }
      const timerId = setTimeout(onToastDismiss, timeToAutoDismiss);

      return () => clearTimeout(timerId);
    }, [autoDismissable, timeToAutoDismiss, onToastDismiss]);

    return (
      <div ref={ref} className={`${styles.toast} ${styles[`toast--${type}`]}`} style={style}>
        <button
          className={styles['toast__close']}
          aria-label={t('toastDismiss')}
          title={t('toastDismiss')}
          onClick={onToastDismiss}
        >
          <span aria-hidden={true}>✖</span>
        </button>
        <div className={styles['toast__content']}>
          <Icon />
          <p>{message}</p>
        </div>
      </div>
    );
  }
);

export { Toast };
