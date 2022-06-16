import { nanoid } from 'nanoid';
import {
  MIN_MATCH_SEQUENCE_NUMBER,
  SYMBOLS_METADATA,
  ROW_NUMBER,
  PAY_LINES_METADATA,
  WILDCARD_METADATA,
  SCATTER_METADATA,
  FREE_SPINS_NUMBER,
  EXPLOSIVE_METADATA,
  REELS_NUMBER,
  BONUS_WILDCARDS_NUMBER,
} from '@/game-configs';
import { Position, Symbol, SymbolType, PayLineResult, PayLine, SlotScreenResult } from '@/types';
import { deepClone, getRandomNumber, shuffleArray } from '@/utils';

export const getRandomPosition = (): Position => ({
  reel: getRandomNumber(0, REELS_NUMBER - 1),
  row: getRandomNumber(0, ROW_NUMBER - 1),
});

export const isPositionFilled = (positions: Position[], position: Position): boolean =>
  positions.some(({ reel, row }) => position.row === row && position.reel === reel);

const getWildcardPositions = (): Position[] => {
  const positions: Position[] = [];

  [...Array(BONUS_WILDCARDS_NUMBER)].forEach(() => {
    let position: Position;

    do {
      position = getRandomPosition();
    } while (isPositionFilled(positions, position));
    positions.push(position);
  });

  return positions;
};

export const getShuffledReels = (): Symbol[][] => {
  const shuffledArray = [...Array(REELS_NUMBER)].map(() => {
    const symbolsArray: Symbol[] = deepClone<Omit<Symbol, 'id'>[]>(Object.values(SYMBOLS_METADATA))
      .reduce(
        (completedArray: Symbol[], currentSymbol: Omit<Symbol, 'id'>) =>
          completedArray.concat(Array(currentSymbol.frequency).fill(currentSymbol)),
        []
      )
      .map(symbol => ({ ...symbol, id: nanoid() }));

    return shuffleArray<Symbol>(symbolsArray);
  });

  // add a wildcard to one of the reels at random position
  const wildcardPosition: Position = getRandomPosition();
  shuffledArray[wildcardPosition.reel].splice(wildcardPosition.row, 0, {
    ...WILDCARD_METADATA,
    id: nanoid(),
  });
  return shuffledArray;
};

const getSymbolMetaData = (symbolType: SymbolType): Symbol | null => {
  if (!SYMBOLS_METADATA[symbolType]) {
    return null;
  }
  return SYMBOLS_METADATA[symbolType] as Symbol;
};

const findWinFactor = (symbolType: SymbolType, symbolsInLine: number): number => {
  const symbolMetadata = getSymbolMetaData(symbolType);
  if (!symbolMetadata || !symbolMetadata.winFactor) {
    return 0;
  }

  const factorIndex = symbolsInLine - MIN_MATCH_SEQUENCE_NUMBER;
  return symbolMetadata.winFactor[factorIndex];
};

export const wonBonusWildCards = (): boolean => Math.random() < 0.3;

// not matched symbols are different and none of them is wildcard
const areSymbolsNotMatched = (symbolAType: SymbolType, symbolB: Symbol): boolean =>
  symbolAType !== symbolB.type &&
  symbolAType !== WILDCARD_METADATA.type &&
  symbolB.type !== WILDCARD_METADATA.type;

export const getScreenWithBonusWildcards = (
  slotScreen: Symbol[][]
): { wildcardsPositions: Position[]; slotScreenWithWildcards: Symbol[][] } => {
  const slotScreenWithWildcards: Symbol[][] = deepClone<Symbol[][]>(slotScreen);
  const wildcardsPositions: Position[] = getWildcardPositions();
  for (const { reel, row } of wildcardsPositions) {
    slotScreenWithWildcards[reel][row] = { ...WILDCARD_METADATA, id: nanoid() };
  }
  return { wildcardsPositions, slotScreenWithWildcards };
};

const getPayLineResult = (slotScreen: Symbol[][], payLine: PayLine): PayLineResult => {
  let currentSymbolType: SymbolType | undefined;
  let numberOfSymbolsInLine: number = 0;
  let initialPositionIndex: number = 0;
  for (let positionIndex = 0; positionIndex < payLine.positions.length; positionIndex++) {
    const position: Position = payLine.positions[positionIndex];
    const symbol: Symbol = slotScreen[position.reel][position.row];

    // if first position, set initial values and go to next iteration
    if (positionIndex === 0) {
      currentSymbolType = symbol.type;
      numberOfSymbolsInLine = 1;
      continue;
    }

    if (areSymbolsNotMatched(currentSymbolType as SymbolType, symbol)) {
      // if we already have a win sequence but the current symbol is not a match, break
      if (numberOfSymbolsInLine >= MIN_MATCH_SEQUENCE_NUMBER) {
        break;
      }

      // If no win sequence yet, check if previous symbol is a Wildcard, which was not set as currentSymbol in the previous iteration
      // because regular symbols are preferentially stored instead, to be able to check if the next symbols are a match with them

      // if index of previous symbol is higher than MIN_MATCH_SEQUENCE_NUMBER, there is no chance to match a line
      // even if we have a wildcard in the previous posiiton, so break
      if (positionIndex - 1 > MIN_MATCH_SEQUENCE_NUMBER - 1) {
        break;
      }

      const previousPosition: Position = payLine.positions[positionIndex - 1];
      const previousSymbol: Symbol = slotScreen[previousPosition.reel][previousPosition.row];
      // Check if previous symbol is wildcard, so the new line can start being evaluated from the wildcard position
      if (previousSymbol.type === WILDCARD_METADATA.type) {
        currentSymbolType = symbol.type;
        numberOfSymbolsInLine = 2;
        initialPositionIndex = positionIndex - 1;
        continue;
      }

      // if no wildcard in previous position and currentSymbolIndex is higher than MIN_MATCH_SEQUENCE_NUMBER, there is no chance to match, so break
      if (positionIndex > MIN_MATCH_SEQUENCE_NUMBER - 1) {
        break;
      }

      // if there is still a chance to match, adjust initial checking variables and continue to next iteration
      currentSymbolType = symbol.type;
      numberOfSymbolsInLine = 1;
      initialPositionIndex = positionIndex;
      continue;
    }

    // if currentSymbolType is wildcard, update it to symbol.type
    if (currentSymbolType === WILDCARD_METADATA.type) {
      currentSymbolType = symbol.type;
    }

    numberOfSymbolsInLine++;
  }

  return {
    currentSymbolType: currentSymbolType!,
    numberOfSymbolsInLine,
    initialPositionIndex,
  };
};

export const getScreenResult = (slotScreen: Symbol[][]): SlotScreenResult => {
  const payLines: PayLine[] = Object.values(PAY_LINES_METADATA);
  const winPayLines: PayLine[] = [];
  let bonusFactor: number = 0;
  let winAmount: number = 0;
  let freeSpins: number = 0;

  for (const payLine of payLines) {
    const { currentSymbolType, numberOfSymbolsInLine, initialPositionIndex } = getPayLineResult(
      slotScreen,
      payLine
    );

    if (numberOfSymbolsInLine < MIN_MATCH_SEQUENCE_NUMBER) {
      continue;
    }

    if (currentSymbolType === EXPLOSIVE_METADATA.type) {
      bonusFactor = numberOfSymbolsInLine;
    }

    if (currentSymbolType === SCATTER_METADATA.type) {
      freeSpins += FREE_SPINS_NUMBER;
    }

    const winFactor: number = findWinFactor(currentSymbolType as SymbolType, numberOfSymbolsInLine);
    winAmount += winFactor;
    winPayLines.push({
      ...payLine,
      positions: payLine.positions.slice(
        initialPositionIndex,
        initialPositionIndex + numberOfSymbolsInLine
      ),
    });
  }

  return {
    winAmount,
    winPayLines,
    bonusFactor,
    freeSpins,
  };
};
