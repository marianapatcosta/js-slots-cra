import { FormEvent, useCallback, useContext, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/store/types';
import { Button } from '@/components/ui/Button';
import { InputNumber } from '@/components/ui/InputNumber';
import {
  AUTO_SPIN_STATE_CHANGED,
  BET_UPDATED,
  SHOW_PAY_LINES_STATE_CHANGED,
} from '@/store/action-types';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { InfoSvg, SettingsSvg } from '@/assets/svg';
import { ModalContext, ModalContextData } from '@/context/ModalContext';
import { ModalType } from '@/types';
import { BubblePressSound, CasinoPressSound, CoinsSound, SelectPressSound } from '@/assets/sounds';
import styles from './styles.module.scss';

interface ControllersProps extends HTMLAttributes<HTMLDivElement> {
  isSpinning: boolean;
  onSpin: () => void;
}

const Controllers: React.FC<ControllersProps> = ({ isSpinning, onSpin }) => {
  const [t] = useTranslation();
  const isSoundOn = useSelector((state: State) => state.settings.isSoundOn);
  const credits = useSelector((state: State) => state.slotMachine.credits);
  const bet = useSelector((state: State) => state.slotMachine.bet);
  const isAutoSpinOn = useSelector((state: State) => state.slotMachine.isAutoSpinOn);
  const showPayLines = useSelector((state: State) => state.slotMachine.showPayLines);
  const winPayLines = useSelector((state: State) => state.slotMachine.winPayLines);
  const losePayLines = useSelector((state: State) => state.slotMachine.losePayLines);
  const dispatch = useDispatch();

  const coinsSound: HTMLAudioElement = new Audio(CoinsSound);
  const casinoPressSound: HTMLAudioElement = new Audio(CasinoPressSound);
  const selectPressSound: HTMLAudioElement = new Audio(SelectPressSound);
  const bubblePressSound: HTMLAudioElement = new Audio(BubblePressSound);

  const { openModal } = useContext<ModalContextData>(ModalContext);

  const handleUpdateControllersState = useCallback(
    (actionType: string, newValue: unknown) => {
      const action = { type: actionType, payload: newValue };
      dispatch(action);
    },
    [dispatch]
  );

  const handleBetIncrease = useCallback(() => {
    if (bet + 1 > credits) {
      return;
    }
    const action = { type: BET_UPDATED, payload: bet + 1 };
    dispatch(action);
  }, [bet, credits, dispatch]);

  const handleBetDecrease = useCallback(() => {
    if (bet - 1 < 0) {
      return;
    }
    const action = { type: BET_UPDATED, payload: bet - 1 };
    dispatch(action);
  }, [bet, dispatch]);

  const handleCurrentBetChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const value = parseInt(target.value);
      if (value - 1 < 0 || value + 1 > credits) {
        return;
      }
      const action = { type: BET_UPDATED, payload: value };
      dispatch(action);
    },
    [credits, dispatch]
  );

  return (
    <div className={styles.controllers}>
      <div className={styles['controllers__settings']}>
        <ButtonIcon
          icon={InfoSvg}
          aria-label={t('controllers.checkInfo')}
          title={t('controllers.checkInfo')}
          buttonSound={isSoundOn ? bubblePressSound : null}
          onClick={() => openModal(ModalType.ABOUT)}
        />
        <ButtonIcon
          icon={SettingsSvg}
          aria-label={t('controllers.checkSettings')}
          title={t('controllers.checkSettings')}
          buttonSound={isSoundOn ? bubblePressSound : null}
          onClick={() => openModal(ModalType.SETTINGS)}
        />
      </div>
      <InputNumber
        label={t('controllers.bet')}
        additionalClass={styles['controllers__bet-input']}
        value={bet}
        min={1}
        max={credits}
        disabled={isSpinning}
        buttonsSound={isSoundOn ? coinsSound : null}
        onChange={handleCurrentBetChange}
        onIncreaseBet={handleBetIncrease}
        onDecreaseBet={handleBetDecrease}
      />
      <Button
        label={t('controllers.spin')}
        aria-label={t('controllers.spin')}
        disabled={isSpinning || !!winPayLines.length || !!losePayLines.length}
        additionalClass={styles['controllers__spin-button']}
        buttonSound={isSoundOn ? casinoPressSound : null}
        onClick={onSpin}
      />
      <Button
        label={t('controllers.autoSpin')}
        isPressed={isAutoSpinOn}
        buttonSound={isSoundOn ? selectPressSound : null}
        onClick={() => handleUpdateControllersState(AUTO_SPIN_STATE_CHANGED, !isAutoSpinOn)}
      />
      <Button
        label={t('controllers.payLines')}
        isPressed={showPayLines && !winPayLines.length && !losePayLines.length}
        buttonSound={isSoundOn ? selectPressSound : null}
        onClick={() => handleUpdateControllersState(SHOW_PAY_LINES_STATE_CHANGED, !showPayLines)}
      />
    </div>
  );
};

export { Controllers };
