import React from 'react';
import { nanoid } from 'nanoid';
import { PayLines, Reel } from '@/components';
import type { Symbol } from '@/types';
import { MIN_SPIN_ANIMATION_DURATION, MAX_SPIN_ANIMATION_DURATION } from '@/game-configs';
import { getRandomNumber } from '@/utils';
import styles from './styles.module.scss';

interface ReelsProps {
  reels: Symbol[][];
}

const Reels: React.FunctionComponent<ReelsProps> = ({ reels }) => {
  const animationDuration =
    getRandomNumber(MIN_SPIN_ANIMATION_DURATION, MAX_SPIN_ANIMATION_DURATION) * Math.random();

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
      <PayLines />
    </div>
  );
};

export { Reels };
