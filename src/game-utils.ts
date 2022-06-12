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

const findWinOrLoseFactor = (symbolType: SymbolType, symbolsInLine: number): number => {
  const symbolMetadata = getSymbolMetaData(symbolType);
  if (!symbolMetadata || (!symbolMetadata.winFactor && !symbolMetadata.loseFactor)) {
    return 0;
  }

  const factorIndex = symbolsInLine - MIN_MATCH_SEQUENCE_NUMBER;
  if (symbolMetadata.winFactor) {
    return symbolMetadata.winFactor[factorIndex];
  }

  return symbolMetadata.loseFactor![factorIndex];
};

export const wonBonusWildCards = (): boolean => Math.random() < 0.3;

// not matched symbols are different and one of them is explosive or symbols are different and none of them is wildcard
const areSymbolsNotMatched = (symbolAType: SymbolType, symbolB: Symbol): boolean =>
  symbolAType !== symbolB.type &&
  (symbolB.type === EXPLOSIVE_METADATA.type ||
    symbolAType === EXPLOSIVE_METADATA.type ||
    (symbolAType !== WILDCARD_METADATA.type && symbolB.type !== WILDCARD_METADATA.type));

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

    // set initial values and go to next iteration
    if (positionIndex === 0) {
      currentSymbolType = symbol.type;
      numberOfSymbolsInLine = 1;
      continue;
    }

    if (areSymbolsNotMatched(currentSymbolType as SymbolType, symbol)) {
      // if symbols are not a match and positionIndex > MIN_MATCH_SEQUENCE_NUMBER, there is no more chance to match a line, so break
      if (positionIndex > MIN_MATCH_SEQUENCE_NUMBER - 1) {
        break;
      }
      // if there is still a change to match, adjust initial checking variables and continue to next iteration
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
  const losePayLines: PayLine[] = [];
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
      const lossFactor: number = findWinOrLoseFactor(
        currentSymbolType as SymbolType,
        numberOfSymbolsInLine
      );
      winAmount -= lossFactor;
      losePayLines.push({
        ...payLine,
        positions: payLine.positions.slice(
          initialPositionIndex,
          initialPositionIndex + numberOfSymbolsInLine
        ),
      });
      continue;
    }

    if (currentSymbolType === SCATTER_METADATA.type) {
      freeSpins += FREE_SPINS_NUMBER;
    }

    const winFactor: number = findWinOrLoseFactor(
      currentSymbolType as SymbolType,
      numberOfSymbolsInLine
    );
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
    losePayLines,
    freeSpins,
  };
};
