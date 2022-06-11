import { TickSvg } from '@/assets/svg';
import { ChangeEvent, HTMLProps } from 'react';
import styles from './styles.module.scss';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  additionalClass?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  additionalClass,
  onChange,
  ...rest
}) => {
  return (
    <label className={`${styles.checkbox} ${additionalClass ? additionalClass : ''} `}>
      <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <div className={styles['checkbox__toggle']}>{checked && <TickSvg />}</div>
      {!!label && label}
    </label>
  );
};

export { Checkbox };
