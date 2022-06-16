import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { PayLines, Reel } from '@/components';
import type { Position, Symbol } from '@/types';
import { MIN_SPIN_ANIMATION_DURATION, MAX_SPIN_ANIMATION_DURATION } from '@/game-configs';
import { getRandomNumber } from '@/utils';
import { State } from '@/store/types';
import styles from './styles.module.scss';

interface ReelsProps {
  reels: Symbol[][];
}

const Reels: React.FunctionComponent<ReelsProps> = ({ reels }) => {
  const animationDuration =
    getRandomNumber(MIN_SPIN_ANIMATION_DURATION, MAX_SPIN_ANIMATION_DURATION) * Math.random();
  const bonusWildCardsPositions: Position[] = useSelector(
    (state: State) => state.slotMachine.bonusWildcardsPositions
  );
  const bonusFactor: number = useSelector((state: State) => state.slotMachine.bonusFactor);
  const bonusText: string = useMemo(() => {
    if (!!bonusWildCardsPositions.length && !!bonusFactor) {
      return `BONUS x${bonusFactor}`;
    }

    if (!!bonusWildCardsPositions.length) {
      return 'BONUS';
    }

    if (!!bonusFactor) {
      return `x${bonusFactor}`;
    }

    return '';
  }, [bonusFactor, bonusWildCardsPositions]);

  return (
    <div className={styles.reels} data-cy="reels">
      {reels.map((reel, index) => (
        <Reel
          symbols={reel}
          key={`reel-${nanoid()}`}
          reelIndex={index}
          animationDuration={animationDuration}
        />
      ))}
      {!!bonusText && <h3 className={styles['reels__bonus']}>{bonusText}</h3>}
      <PayLines />
    </div>
  );
};

export { Reels };
