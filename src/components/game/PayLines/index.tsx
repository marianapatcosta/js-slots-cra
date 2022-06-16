import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { State } from '@/store/types';
import { ROW_NUMBER, PAY_LINES_METADATA } from '@/game-configs';
import type { Position, PayLine } from '@/types';
import { remToPixel } from '@/utils';
import { ReelsContext, ReelsContextData } from '@/context/ReelsContext';
import styles from './styles.module.scss';

type LineNumberSquareData = { top: number; color: string; lineNumber: number }[];

const PayLines: React.FC = () => {
  const showPayLines = useSelector((state: State) => state.slotMachine.showPayLines);
  const winPayLines: PayLine[] = useSelector((state: State) => state.slotMachine.winPayLines);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [lineNumbersSquaresData, setLineNumbersSquaresData] = useState<LineNumberSquareData>([]);
  const { symbolSize } = useContext<ReelsContextData>(ReelsContext);
  const getYCoordOffset = useCallback(
    (lineNumber: number): number => {
      let offset: number = 0;
      // if row number > last row  (ROW_NUMBER)
      const isLineNumberHigherThanRowsNumber = lineNumber > ROW_NUMBER;
      if (isLineNumberHigherThanRowsNumber && lineNumber % 2 === 0) {
        offset = -symbolSize / 3;
      }
      if (isLineNumberHigherThanRowsNumber && lineNumber % 2 !== 0) {
        offset = symbolSize / 3;
      }
      return offset;
    },
    [symbolSize]
  );

  const getXCoord = useCallback(
    (reel: number): number => {
      const GAP_BETWEEN_REELS = 0.25; // in rem
      return remToPixel((reel + 1) * (symbolSize + GAP_BETWEEN_REELS) - symbolSize / 2);
    },
    [symbolSize]
  );

  const getYCoord = useCallback(
    (row: number, lineNumber: number): number => {
      const offset: number = getYCoordOffset(lineNumber);
      return remToPixel((row + 1) * symbolSize - symbolSize / 2 + offset);
    },
    [symbolSize, getYCoordOffset]
  );

  const drawPayLine = useCallback(
    (context: CanvasRenderingContext2D, winningLine: PayLine, lineNumber: number): void => {
      context.beginPath();
      context.lineWidth = 4;
      context.strokeStyle = winningLine.color;
      context.fillStyle = winningLine.color;

      context.lineTo(0, getYCoord(winningLine.positions[0].row, lineNumber));

      winningLine.positions.forEach(({ reel, row }: Position) => {
        context.lineTo(getXCoord(reel), getYCoord(row, lineNumber));
      });

      context.lineTo(
        canvasRef.current?.width!,
        getYCoord(winningLine.positions[winningLine.positions.length - 1].row, lineNumber)
      );

      context.stroke();
    },
    [getYCoord, getXCoord]
  );

  const filterPayLinesToRender = useCallback((payLinesMetadata: PayLine[]): PayLine[] => {
    const payLineTypes = payLinesMetadata.map(({ type }: PayLine) => type);
    return Object.values(PAY_LINES_METADATA).filter(({ type }: PayLine) =>
      payLineTypes.includes(type)
    );
  }, []);

  const getPayLinesMetadata = useCallback((): PayLine[] => {
    if (winPayLines?.length) {
      return filterPayLinesToRender(winPayLines);
    }

    return Object.values(PAY_LINES_METADATA);
  }, [winPayLines, filterPayLinesToRender]);

  const getLineNumberSquaresData = useCallback(
    (payLines: PayLine[]): LineNumberSquareData =>
      payLines.map((data: PayLine) => {
        const lineNumber: number = parseInt(data.type.split('payLine')[1]);
        return {
          top: getYCoord(data.positions[0].row, lineNumber),
          color: data.color,
          lineNumber,
        };
      }),
    [getYCoord]
  );

  const drawCanvas = useCallback((): void => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    // adjust canvas dimension to be accurate with pixel-based calculations
    canvasRef.current.width = canvasRef.current?.offsetWidth;
    canvasRef.current.height = canvasRef.current?.offsetHeight;
    const payLinesMetadata: PayLine[] = getPayLinesMetadata();
    const lineNumbersData: LineNumberSquareData = getLineNumberSquaresData(payLinesMetadata);
    setLineNumbersSquaresData(lineNumbersData);
    payLinesMetadata.forEach((sequenceMetadata: PayLine) => {
      const lineNumber: number = parseInt(sequenceMetadata.type.split('payLine')[1]);
      drawPayLine(context, sequenceMetadata, lineNumber);
    });
  }, [drawPayLine, getPayLinesMetadata, getLineNumberSquaresData]);

  useEffect(() => {
    drawCanvas();
  }, [symbolSize, drawCanvas]);

  return (
    <CSSTransition
      in={showPayLines}
      timeout={200}
      unmountOnExit
      onEnter={drawCanvas}
      classNames={{
        enterActive: styles['pay-lines-enter-active'],
        enterDone: styles['pay-lines-enter-done'],
        exit: styles['pay-lines-exit'],
        exitActive: styles['pay-lines-exit-active'],
      }}
      nodeRef={canvasWrapperRef}
    >
      <div className={styles['pay-lines']} ref={canvasWrapperRef}>
        <>
          {lineNumbersSquaresData.map(data => (
            <div
              style={{ top: `${data.top}px`, backgroundColor: data.color }}
              className={styles['pay-lines__number']}
              key={`line-${data.lineNumber}`}
            >
              {data.lineNumber}
            </div>
          ))}
        </>
        <canvas ref={canvasRef}></canvas>
      </div>
    </CSSTransition>
  );
};

export { PayLines };
