import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { State } from '@/store/types';
import { Symbol as SymbolComponent } from '@/components';
import { REELS_NUMBER, ROW_NUMBER, WILDCARD_METADATA } from '@/game-configs';
import type { Position, Symbol } from '@/types';
import { remToPixel } from '@/utils';
import { ReelsContext, ReelsContextData } from '@/context/ReelsContext';
import styles from './styles.module.scss';

interface ReelProps {
  symbols: Symbol[];
  reelIndex: number;
  animationDuration: number;
}

const Reel: React.FC<ReelProps> = ({ symbols, reelIndex, animationDuration }) => {
  const areSlotsSpinning = useSelector((state: State) => state.slotMachine.isSpinning);
  const [isReelSpinning, setIsReelSpinning] = useState<boolean>(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const reelSelector: gsap.utils.SelectorFunc = gsap.utils.selector(reelRef);
  const [spinAnimation, setSpinAnimation] = useState<gsap.core.Tween | null>(null);

  const bonusWildCardsPositions: Position[] = useSelector(
    (state: State) => state.slotMachine.bonusWildcardsPositions
  ).filter(({ reel }: Position) => reel === reelIndex);

  const { symbolSize, onSpinningEnd, onReelAnimationEnd } =
    useContext<ReelsContextData>(ReelsContext);

  const onSpinningAnimationEnd = useCallback(() => {
    setIsReelSpinning(false);
    onReelAnimationEnd(reelIndex);
    if (reelIndex === REELS_NUMBER - 1) {
      onSpinningEnd();
    }
  }, [reelIndex, onReelAnimationEnd, onSpinningEnd]);

  useEffect(() => {
    if (!areSlotsSpinning) {
      return;
    }
    setIsReelSpinning(true);
    spinAnimation?.play();
  }, [areSlotsSpinning, spinAnimation]);

  useEffect(() => {
    const symbolSizeInPx: number = remToPixel(symbolSize);
    gsap.set(`#symbol-${reelIndex}`, {
      y: (index: number) => index * symbolSizeInPx,
    });

    const reelHeight: number = symbols.length * symbolSizeInPx;
    const wrapOffsetTop: number = -symbolSizeInPx;
    const wrapOffsetBottom: number = reelHeight + wrapOffsetTop;
    const wrap = gsap.utils.wrap(wrapOffsetTop, wrapOffsetBottom);
    setSpinAnimation(
      gsap.to(reelSelector(`#symbol-${reelIndex}`), {
        duration: animationDuration,
        y: `+=${reelHeight}`,
        ease: 'power1.in',
        paused: true,
        modifiers: {
          y: gsap.utils.unitize(wrap),
        },
        onComplete: onSpinningAnimationEnd,
      })
    );
    return () => {
      spinAnimation?.kill();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.reel} ref={reelRef} data-cy="reel">
      {symbols.map((symbol, index) => (
        <SymbolComponent
          symbol={symbol}
          isSpinning={isReelSpinning}
          key={symbol.id}
          reelIndex={reelIndex}
          symbolIndex={index < ROW_NUMBER ? index : null}
        />
      ))}
      {!!bonusWildCardsPositions.length &&
        bonusWildCardsPositions.map(({ reel, row }) => (
          <SymbolComponent
            key={`wildcard-${reel}-${row}`}
            symbol={{ ...WILDCARD_METADATA, id: nanoid() }}
            reelIndex={reel}
            symbolIndex={row}
            isBonusWildCard={true}
          />
        ))}
    </div>
  );
};

export { Reel };
