import styles from './styles.module.scss';
interface SymbolSvgProps {
  animate?: boolean;
}

const PiniaSvg: React.FC<SymbolSvgProps> = ({ animate }) => {
  return (
    <svg
      aria-hidden={true}
      viewBox="0 0 339 477"
      width="50"
      height="50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id="a">
        <stop stopColor="#52ce63" offset="0" />
        <stop stopColor="#51a256" offset="1" />
      </linearGradient>
      <linearGradient id="i" x1="55.342%" x2="42.817%" y2="42.863%" xlinkHref="#a">
        <stop stopColor="#8ae99c" offset="0" />
        <stop stopColor="#52ce63" offset="1" />
      </linearGradient>
      <linearGradient id="h" x1="55.349%" x2="42.808%" y2="42.863%" xlinkHref="#a">
        {' '}
        <stop stopColor="#8ae99c" offset="0" />
        <stop stopColor="#52ce63" offset="1" />
      </linearGradient>
      <linearGradient id="g" x1="50%" x2="50%" y2="58.811%">
        <stop stopColor="#8ae99c" offset="0" />
        <stop stopColor="#52ce63" offset="1" />
      </linearGradient>
      <linearGradient id="f" x1="51.378%" x2="44.585%" y1="17.473%" y2="100%">
        <stop stopColor="#ffe56c" offset="0" />
        <stop stopColor="#ffc63a" offset="1" />
      </linearGradient>
      <g transform="translate(-34 -24)" fill="none" fillRule="evenodd">
        <g
          className={animate ? styles['icon__leaves'] : ''}
          transform="matrix(.99255 .12187 -.12187 .99255 33.922 .97669)"
        >
          <path
            transform="matrix(.70711 -.70711 .70711 .70711 -80.496 125.89)"
            d="m103.95 258.27c44.362-4.3608 60.015-40.391 65.353-94.699s-30.932-103.45-46.02-101.97c-15.088 1.4832-63.039 58.905-68.377 113.21-5.3386 54.308 4.6828 87.815 49.044 83.454z"
            fill="url(#i)"
          />
          <path
            transform="matrix(.70711 .70711 -.70711 .70711 191.4 -141.86)"
            d="m275.88 258.27c44.362 4.3608 53.167-29.265 47.829-83.573-5.3386-54.308-52.073-111.61-67.161-113.09-15.088-1.4832-52.575 47.54-47.236 101.85s22.207 90.458 66.569 94.819z"
            fill="url(#h)"
          />
          <path
            d="m188.37 216.88c39.942 0 50.953-38.252 50.953-97.899 0-59.647-37.368-118.1-50.953-118.1s-52.047 58.455-52.047 118.1c0 59.647 12.106 97.899 52.047 97.899z"
            fill="url(#g)"
          />
        </g>
        <path
          d="m184.47 501c83.119 0 150.53-24.145 150.53-133.65s-67.408-199.35-150.53-199.35c-83.119 0-150.47 89.855-150.47 199.35s67.355 133.65 150.47 133.65z"
          fill="url(#f)"
        />
        <ellipse cx="260.5" cy="335" rx="21.5" ry="10" fill="#eaadcc" />
        <ellipse
          transform="matrix(.99255 .12187 -.12187 .99255 40.859 -10.039)"
          cx="102.5"
          cy="329"
          rx="21.5"
          ry="10"
          fill="#eaadcc"
        />
        <g transform="matrix(-.99939 .0349 .0349 .99939 269.28 271.03)">
          <path
            transform="matrix(.99985 .017452 -.017452 .99985 1.0265 -1.6248)"
            d="m73.105 58.273c6.7372 4.913 14.313 6.6641 22.728 5.2531 8.4148-1.411 14.505-5.2536 18.272-11.528"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
          />
          <path
            d="m154.5 3c-5.9375 0-11.313 2.4063-15.204 6.2968-3.8909 3.8906-6.2975 9.2655-6.2975 15.203 0 5.9377 2.4065 11.313 6.2973 15.203 3.8909 3.8908 9.2662 6.2971 15.204 6.2971 5.9371 0 11.312-2.4064 15.202-6.2972 3.8903-3.8907 6.2965-9.2657 6.2965-15.203 0-5.9372-2.4062-11.312-6.2967-15.203-3.8905-3.8906-9.2652-6.2969-15.202-6.2969z"
            fill="#000"
            className={animate ? styles['icon__eye-ball'] : ''}
          />
          <path
            d="m154 21c0-3.8655 3.1354-7 6.9994-7 3.8664 0 7.0006 3.1345 7.0006 7s-3.1342 7-7.0006 7c-3.8641-0.0011735-6.9994-3.1345-6.9994-7z"
            fill="#fff"
            className={animate ? styles['icon__eye-ball'] : ''}
          />
          <path
            d="m24.5 13c-5.9375 0-11.312 2.4063-15.203 6.2967-3.8907 3.8906-6.297 9.2655-6.297 15.203 0 5.9378 2.4063 11.313 6.2968 15.204 3.8906 3.8907 9.2656 6.297 15.203 6.297 5.9371 0 11.312-2.4064 15.203-6.2973 3.8905-3.8907 6.297-9.2656 6.297-15.203 0-5.9371-2.4065-11.312-6.2972-15.202-3.8908-3.8906-9.2658-6.297-15.203-6.297z"
            fill="#000"
            className={animate ? styles['icon__eye-ball'] : ''}
          />
          <g fill="#fff">
            <path
              d="m136 24.499c0 10.219 8.2829 18.501 18.501 18.501 10.217 0 18.499-8.282 18.499-18.501 0-10.217-8.2818-18.499-18.499-18.499-10.218 0-18.501 8.282-18.501 18.499zm-6 0c0-13.531 10.969-24.499 24.501-24.499 13.531 0 24.499 10.968 24.499 24.499 0 13.532-10.968 24.501-24.499 24.501-13.532 0-24.501-10.968-24.501-24.501z"
              fillRule="nonzero"
              stroke="#fff"
              strokeWidth="3"
              className={animate ? styles['icon__eye'] : ''}
            />
            <path
              d="m6 34.499c0 10.219 8.2818 18.501 18.5 18.501 10.217 0 18.5-8.282 18.5-18.501 0-10.217-8.2829-18.499-18.5-18.499-10.218 0-18.5 8.282-18.5 18.499zm-6 0c0-13.531 10.968-24.499 24.5-24.499 13.531 0 24.5 10.968 24.5 24.499 0 13.532-10.969 24.501-24.5 24.501-13.532 0-24.5-10.968-24.5-24.501z"
              fillRule="nonzero"
              stroke="#fff"
              strokeWidth="3"
              className={animate ? styles['icon__eye'] : ''}
            />
            <path
              className={animate ? styles['icon__eye-ball'] : ''}
              d="m24 31c0-3.8655 3.1345-7 7-7s7 3.1345 7 7-3.1345 7-7 7-7-3.1345-7-7z"
            />
          </g>
        </g>
        <g strokeLinecap="round" strokeWidth="11">
          <g stroke="#ecb732">
            <path d="m70.5 377.5 74 77" />
            <path d="m134.5 386.5-47 50" />
          </g>
          <g transform="matrix(-1 0 0 1 298 377)" stroke="#ecb732">
            <path d="m.5.5 74 77" />
            <path d="m64.5 9.5-47 50" />
          </g>
          <g transform="matrix(0 1 -1 0 215 207)" stroke="#ffc73b">
            <path d="m.5.5 49 49" />
            <path transform="matrix(-1 0 0 1 50 0)" d="m.5 10.5 49 49" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export { PiniaSvg };
