import { useEffect, useState, HTMLAttributes, CSSProperties, useMemo } from 'react';
import { Color, PayLine, Position, Symbol as SymbolType } from '@/types';
import { useSelector } from 'react-redux';
import { State } from '@/store/types';
import styles from './styles.module.scss';

interface SymbolProps extends HTMLAttributes<HTMLDivElement> {
  symbol: SymbolType;
  reelIndex: number;
  symbolIndex: number | null;
  isSpinning?: boolean;
  isBonusWildCard?: boolean;
}

const Symbol: React.FC<SymbolProps> = ({
  symbol,
  reelIndex,
  symbolIndex,
  isSpinning = false,
  isBonusWildCard = false,
}) => {
  const SymbolIcon = symbol.icon;
  const winPayLines: PayLine[] = useSelector((state: State) => state.slotMachine.winPayLines);
  const bonusWildcardsPositions: Position[] = useSelector(
    (state: State) => state.slotMachine.bonusWildcardsPositions
  );
  const [animatedColors, setAnimatedColors] = useState<Color[] | undefined>(undefined);
  const [willBeReplacedByBonusWildCardSymbol, setWillBeReplacedByBonusWildCardSymbol] =
    useState<boolean>(false);

  const cssVars = useMemo(
    () =>
      ({
        '--symbol-index': symbolIndex || 0,
        '--bg-color-from': !!animatedColors?.length ? animatedColors[0] : 'inherit',
        '--bg-color-to': !!animatedColors?.length
          ? animatedColors[animatedColors?.length - 1]
          : 'inherit',
      } as CSSProperties),
    [animatedColors, symbolIndex]
  );

  useEffect(() => {
    if (symbolIndex === null) {
      return;
    }
    const payLinesContainingTheSymbol: PayLine[] = winPayLines.filter(({ positions }: PayLine) =>
      positions.some(({ reel, row }: Position) => reel === reelIndex && row === symbolIndex)
    );

    setAnimatedColors(payLinesContainingTheSymbol.map(({ color }) => color));
  }, [winPayLines, reelIndex, symbolIndex]);

  useEffect(() => {
    if (symbolIndex === null) {
      return;
    }
    const willBeReplaced: boolean = isBonusWildCard
      ? false
      : bonusWildcardsPositions.some(
          ({ reel, row }: Position) => reel === reelIndex && row === symbolIndex
        );

    setWillBeReplacedByBonusWildCardSymbol(willBeReplaced);
  }, [bonusWildcardsPositions, reelIndex, symbolIndex, isBonusWildCard]);

  return (
    <div
      id={isBonusWildCard ? undefined : `symbol-${reelIndex}`}
      data-cy="symbol"
      className={`${styles.symbol} ${isSpinning ? styles['symbol--spinning'] : ''} ${
        willBeReplacedByBonusWildCardSymbol ? styles['symbol--hidden'] : ''
      } ${isBonusWildCard ? styles['symbol--showing'] : ''} ${
        !!animatedColors?.length ? styles['symbol--colorful'] : ''
      }`}
      style={{ ...cssVars }}
    >
      <SymbolIcon animate={!!animatedColors?.length} />
    </div>
  );
};

export { Symbol };
