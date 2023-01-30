import { getShuffledReels } from '../game-utils';
import { Symbol } from '../types';

export type WorkerPostMessageData = {
  data: Symbol[][];
};

/* eslint-disable-next-line no-restricted-globals */
self.onmessage = (event: MessageEvent) => {
  const reels = getShuffledReels();

  /* eslint-disable-next-line no-restricted-globals */
  self.postMessage({ data: reels });
};
