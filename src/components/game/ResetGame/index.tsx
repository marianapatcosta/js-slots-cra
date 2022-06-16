import { ChangeEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox } from '@/components';
import { GAME_RESET, RESET_MODAL_DISMISSED } from '@/store/action-types';
import { ModalContext, ModalContextData } from '@/context/ModalContext';
import styles from './styles.module.scss';

const ResetGame: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { modalProps, closeModal } = useContext<ModalContextData>(ModalContext);
  const [doNotShowAgain, setDoNotShowAgain] = useState<boolean>(false);
  const buttonLabel: string = modalProps?.hasNoCredits ? t('global.ok') : t('global.yes');

  const handleConfirmDiscard = (): void => {
    if (doNotShowAgain) {
      dispatch({ type: RESET_MODAL_DISMISSED, payload: true });
      return closeModal();
    }
    dispatch({ type: GAME_RESET });
    return closeModal();
  };

  const handleDeclineReset = (): void => {
    if (doNotShowAgain) {
      dispatch({ type: RESET_MODAL_DISMISSED, payload: false });
    }
    closeModal();
  };

  const handleOnChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setDoNotShowAgain(target.checked);
  };

  return (
    <div className={styles.reset}>
      <p>{modalProps?.hasNoCredits ? t('reset.resetGameNoCredits') : t('reset.resetGame')}</p>
      <div className={styles['reset__buttons']}>
        {!modalProps?.hasNoCredits && (
          <Button
            label={t('global.no')}
            aria-label={t('reset.clickDeclineDiscard')}
            title={t('reset.clickDeclineDiscard')}
            onClick={handleDeclineReset}
          />
        )}
        <Button
          label={buttonLabel}
          aria-label={t('reset.clickDiscard', {
            buttonLabel,
          })}
          title={t('reset.clickDiscard', {
            buttonLabel,
          })}
          onClick={handleConfirmDiscard}
        />
      </div>
      {!modalProps?.hasNoCredits && (
        <Checkbox
          label={t('reset.doNotShowAgain')}
          checked={doNotShowAgain}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
};

export { ResetGame };
