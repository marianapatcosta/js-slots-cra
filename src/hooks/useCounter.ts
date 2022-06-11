import { useEffect, useState } from 'react';

export const useCounter = (updatedValue: number): number => {
  const [currentValue, setCurrentValue] = useState<number>(updatedValue);

  useEffect(() => {
    if (updatedValue === currentValue) {
      return;
    }
    let timerId: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
      if (updatedValue === currentValue) {
        return clearTimeout(timerId);
      }
      const valueToUpdate: number = updatedValue < currentValue ? -1 : 1;
      setCurrentValue(prevValue => prevValue + valueToUpdate);
    }, 10);

    return () => clearTimeout(timerId);
  }, [currentValue, updatedValue]);

  return currentValue;
};
