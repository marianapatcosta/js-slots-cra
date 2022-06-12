interface SymbolSvgProps {
  animate?: boolean;
}

const ReactSvg: React.FC<SymbolSvgProps> = ({ animate = false }) => {
  return (
    <svg
      aria-hidden={true}
      width="50"
      height="50"
      viewBox="-11.5 -10.232 23 20.463"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="button-icon"
    >
      <circle r="2.05" fill="#61dafb" />
      <g fill="none" stroke="#61dafb">
        <ellipse rx="11" ry="4.2" id="e1">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 0 0"
              to="0 0 0"
              dur="10s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
        <ellipse transform="rotate(60)" rx="11" ry="4.2">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              to="60 0 0"
              from="420 0 0"
              dur="10s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(120)">
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="120 0 0"
              to="480 0 0"
              dur="10s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
      </g>
    </svg>
  );
};

export { ReactSvg };
