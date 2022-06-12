import { HTMLAttributes, MouseEvent, useCallback } from 'react';
import styles from './styles.module.scss';

interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconText?: string;
  additionalClass?: string;
  buttonSound?: HTMLAudioElement | null;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon: Icon,
  iconText,
  buttonSound,
  additionalClass,
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
      className={`${styles.button} ${additionalClass ? additionalClass : ''}`}
      {...rest}
      onClick={handleOnClick}
    >
      <Icon />
    </button>
  );
};

export { ButtonIcon };
