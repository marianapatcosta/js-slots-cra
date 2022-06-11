import { HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components';
import styles from './styles.module.scss';

interface InputNumberProps extends HTMLProps<HTMLInputElement> {
  value: number;
  min: number;
  max: number;
  label?: string;
  disabled?: boolean;
  additionalClass?: string;
  buttonsSound?: HTMLAudioElement | null;
  onIncreaseBet: () => void;
  onDecreaseBet: () => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  value,
  min,
  max,
  disabled,
  buttonsSound,
  additionalClass,
  onIncreaseBet,
  onDecreaseBet,
  ...rest
}) => {
  const [t] = useTranslation();

  return (
    <div
      className={`${styles['input-number']} ${additionalClass ? additionalClass : ''} ${
        disabled ? styles['input-number--disabled'] : ''
      }`}
    >
      {!!label && <label htmlFor={label}>{label}</label>}
      <div className={styles['input-number__container']}>
        <Button
          label="-"
          aria-label={t('settings.changeSoundsStatus')}
          title={t('settings.changeSoundsStatus')}
          buttonSound={buttonsSound}
          disabled={value <= min}
          onClick={onDecreaseBet}
        />
        <input
          id={label}
          type="number"
          disabled={disabled}
          value={value}
          min={min}
          max={max}
          {...rest}
        />
        <Button
          label="+"
          aria-label={t('settings.changeSoundsStatus')}
          title={t('settings.changeSoundsStatus')}
          buttonSound={buttonsSound}
          disabled={value >= max}
          onClick={onIncreaseBet}
        />
      </div>
    </div>
  );
};

export { InputNumber };
