import { useEffect, useState } from 'react';
import { SYMBOL_SIZE, SYMBOL_SIZE_SMALL } from '@/game-configs';
import { useResize } from './useResize';

export const useSymbolSize = (): number => {
  const windowWidth = useResize();
  const [symbolSize, setSymbolSize] = useState<number>(SYMBOL_SIZE);

  useEffect(() => {
    if (window.matchMedia('(max-width: 480px)').matches && symbolSize !== SYMBOL_SIZE_SMALL) {
      setSymbolSize(SYMBOL_SIZE_SMALL);
    }
    if (window.matchMedia('(min-width: 480px)').matches && symbolSize !== SYMBOL_SIZE) {
      setSymbolSize(SYMBOL_SIZE);
    }
    // eslint-disable-next-line
  }, [windowWidth]);

  return symbolSize;
};
