import { HTMLAttributes, MouseEvent, useCallback } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  buttonSound?: HTMLAudioElement | null;
  isPressed?: boolean;
  iconText?: string;
  disabled?: boolean;
  additionalClass?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  iconText,
  buttonSound,
  additionalClass,
  isPressed = false,
  onClick,
  ...rest
}) => {
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (buttonSound) {
        buttonSound.play();
      }
      onClick(event);
    },
    [buttonSound, onClick]
  );

  return (
    <button
      className={`${styles.button} ${additionalClass ? additionalClass : ''} ${
        isPressed ? styles['button--pressed'] : ''
      }`}
      {...rest}
      onClick={handleOnClick}
    >
      {Icon && <Icon />}
      {label && label}
    </button>
  );
};

export { Button };
