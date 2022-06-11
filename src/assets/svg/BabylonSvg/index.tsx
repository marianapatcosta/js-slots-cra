import styles from './styles.module.scss';

interface SymbolSvgProps {
  animate?: boolean;
}

const BabylonSvg: React.FC<SymbolSvgProps> = ({ animate }) => {
  return (
    <svg
      aria-hidden={true}
      width="50"
      height="50"
      className={animate ? styles.icon : ''}
      viewBox="60 60 325 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>babylon_logo_color</title>
      <path fill="#fff" d="M221.7,64.82l-110.92,64V256.93L221.7,321l110.92-64V128.85Z" />
      <polygon
        fill="#e0684b"
        points="332.62 128.85 297.9 108.81 264.5 128.09 299.22 148.14 332.62 128.85"
      />
      <polygon
        fill="#e0684b"
        points="144.18 148.14 255.09 84.1 221.7 64.81 110.78 128.85 144.18 148.14"
      />
      <polygon
        fill="#e0684b"
        points="186.98 212.94 221.7 232.98 256.41 212.94 221.7 192.89 186.98 212.94"
      />
      <polygon
        fill="#bb464b"
        points="299.22 148.14 299.22 237.65 221.7 282.41 144.18 237.65 144.18 148.14 110.78 128.85 110.78 256.93 221.7 320.97 332.62 256.93 332.62 128.85 299.22 148.14"
      />
      <polygon
        fill="#bb464b"
        points="221.7 152.81 186.98 172.85 186.98 212.94 221.7 192.89 256.41 212.94 256.41 172.85 221.7 152.81"
      />
      <polygon
        fill="#e0ded8"
        points="299.22 148.14 256.41 172.85 256.41 212.94 221.7 232.98 221.7 282.41 299.22 237.65 299.22 148.14"
      />
      <polygon
        fill="#d5d2ca"
        points="144.18 148.14 186.98 172.85 186.98 212.94 221.7 232.98 221.7 282.41 144.18 237.65 144.18 148.14"
      />
      <polygon
        fill="#fff"
        points="255.09 84.1 297.9 108.81 264.5 128.09 299.22 148.14 256.41 172.85 221.7 152.81 186.98 172.85 144.18 148.14 255.09 84.1"
      />
    </svg>
  );
};

export { BabylonSvg };
