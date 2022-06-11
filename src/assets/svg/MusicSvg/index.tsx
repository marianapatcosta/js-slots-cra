import { State } from '@/store/types';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const MusicSvg = () => {
  const isMusicOn = useSelector((state: State) => state.settings.isMusicOn);

  return (
    <svg
      className={styles.icon}
      fill="none"
      aria-hidden={true}
      width="50"
      height="50"
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="m232.26 30.969c-36.998 11.193-30.967 46.452-30.967 46.452v285.53c-11.621-4.328-24.755-6.816-38.709-6.816-47.034 0-85.162 27.73-85.162 61.936s38.128 61.936 85.162 61.936c47.033 0 85.162-27.728 85.162-61.936v-263.23l109.99-21.091s1.163-0.273 2.815-0.716c9.585-2.627 42.037-14.242 42.037-52.048v-80.985l-170.32 30.969z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
        <rect
          className={` ${isMusicOn ? `${styles['icon__line--off']}` : ''}`}
          transform="rotate(45 76.749 30.707)"
          x="76.749"
          y="30.707"
          width="580.3"
          height="60"
          rx="17"
          stroke="#000"
        />
      </g>
    </svg>
  );
};

export { MusicSvg };
