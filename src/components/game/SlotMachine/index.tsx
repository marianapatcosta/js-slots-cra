import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Controllers, Reels, WinsDisplay } from '@/components';
import { ANIMATE_RESULTS_DURATION, ROW_NUMBER } from '@/game-configs';
import { ModalType, Position, SlotScreenResult, Symbol } from '@/types';
import { SPIN_ENDED, GAME_RESET, NEW_SPIN_PREPARED, SPAN } from '@/store/action-types';
import {
  getScreenResult,
  getScreenWithBonusWildcards,
  getShuffledReels,
  wonBonusWildCards,
} from '@/game-utils';
import { State } from '@/store/types';
import { ModalContext, ModalContextData } from '@/context/ModalContext';
import { LoseSound, SlotWheelSound, ThemeSound, WinSound } from '@/assets/sounds';
import { getRandomNumber } from '@/utils';
import { ReelsContext } from '@/context/ReelsContext';
import { useSymbolSize } from '@/hooks';
import styles from './styles.module.scss';

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<Symbol[][]>([]);
  const isMusicOn: boolean = useSelector((state: State) => state.settings.isMusicOn);
  const isSoundOn: boolean = useSelector((state: State) => state.settings.isSoundOn);
  const bet: number = useSelector((state: State) => state.slotMachine.bet);
  const credits: number = useSelector((state: State) => state.slotMachine.credits);
  const isSpinning: boolean = useSelector((state: State) => state.slotMachine.isSpinning);
  const isAutoSpinOn: boolean = useSelector((state: State) => state.slotMachine.isAutoSpinOn);
  const hasOngoingGame: boolean = useSelector((state: State) => state.slotMachine.hasOngoingGame);
  const resetGameOnMount: boolean | null = useSelector(
    (state: State) => state.slotMachine.resetGameOnMount
  );
  const [finalSlotScreen, setFinalSlotScreens] = useState<Symbol[][]>([]);
  const symbolSize: number = useSymbolSize();

  const dispatch = useDispatch();
  const { openModal } = useContext<ModalContextData>(ModalContext);

  const [userAlreadyInteract, setUserAlreadyInteract] = useState<boolean>(false);
  const themeMusic: HTMLAudioElement = useMemo(() => new Audio(ThemeSound), []);
  const slotWheelSound: HTMLAudioElement = useMemo(() => new Audio(SlotWheelSound), []);
  const winSound: HTMLAudioElement = useMemo(() => new Audio(WinSound), []);
  const loseSound: HTMLAudioElement = useMemo(() => new Audio(LoseSound), []);

  const setGameConfigs = useCallback(() => {
    if ((hasOngoingGame && resetGameOnMount === null) || !credits) {
      const modalProps = !credits ? { hasNoCredits: true } : undefined;
      openModal(ModalType.RESET, modalProps);
    }

    if (resetGameOnMount) {
      dispatch({ type: GAME_RESET });
    }
  }, [credits, dispatch, openModal, hasOngoingGame, resetGameOnMount]);

  const playThemeMusic = useCallback((): void => {
    if (!isMusicOn) {
      return;
    }

    themeMusic.play();
    themeMusic.loop = true;
    themeMusic.volume = 0.75;
  }, [isMusicOn, themeMusic]);

  const onSpin = useCallback(() => {
    if (bet > credits) {
      return;
    }

    dispatch({ type: SPAN });

    if (isSoundOn) {
      slotWheelSound.play();
      slotWheelSound.loop = true;
    }
    const slotScreen: Symbol[][] = reels.map(reel => {
      const randomIndex = getRandomNumber(0, reel.length - ROW_NUMBER);
      return reel.slice(randomIndex, randomIndex + ROW_NUMBER);
    });
    setFinalSlotScreens(slotScreen);
  }, [reels, isSoundOn, slotWheelSound, bet, credits, dispatch]);

  const onReelAnimationEnd = useCallback(
    (reelIndex: number): void => {
      setReels(prevReels =>
        prevReels.map((reel, index) =>
          reelIndex !== index
            ? reel
            : [...finalSlotScreen[reelIndex].map(item => ({ ...item, id: nanoid() })), ...reel]
        )
      );
    },
    [finalSlotScreen]
  );

  const getTimerForNewSpin = useCallback(
    (slotResult: SlotScreenResult): number => {
      const noResults = Object.entries(slotResult).every(
        ([_, value]: [string, SlotScreenResult[keyof SlotScreenResult]]) =>
          !value || (Array.isArray(value) && !value.length)
      );

      if (isAutoSpinOn && noResults) {
        return ANIMATE_RESULTS_DURATION / 2;
      }

      return noResults ? ANIMATE_RESULTS_DURATION / 5 : ANIMATE_RESULTS_DURATION;
    },
    [isAutoSpinOn]
  );

  const onSpinningEnd = useCallback(() => {
    slotWheelSound.pause();
    let slotResult: SlotScreenResult = getScreenResult(finalSlotScreen);

    let bonusWildcardsPositions: Position[] = [];
    if (!slotResult.winAmount && wonBonusWildCards()) {
      const { wildcardsPositions, slotScreenWithWildcards } =
        getScreenWithBonusWildcards(finalSlotScreen);
      setFinalSlotScreens(slotScreenWithWildcards);
      slotResult = getScreenResult(slotScreenWithWildcards);
      bonusWildcardsPositions = wildcardsPositions;
    }

    dispatch({ type: SPIN_ENDED, payload: { slotResult, bonusWildcardsPositions } });

    if (isSoundOn) {
      const endSound = !!slotResult.winPayLines.length ? winSound : loseSound;
      endSound.play();
    }

    const timeToNewSpin: number = getTimerForNewSpin(slotResult);

    // shuffle reels for next spinning
    /*   const shuffledReels = getShuffledReels();
    setReels(prevReels =>
      prevReels.map((reel, index) => [
        ...reel.slice(0, ROW_NUMBER),
        ...shuffledReels[index].slice(ROW_NUMBER),
      ])
    ); */

    setTimeout(() => {
      const updatedCredits: number = credits + slotResult.winAmount;
      if (!updatedCredits) {
        openModal(ModalType.RESET, { hasNoCredits: true });
      }
      dispatch({ type: NEW_SPIN_PREPARED });
      if (isAutoSpinOn) {
        onSpin();
      }
    }, timeToNewSpin);
  }, [
    dispatch,
    isSoundOn,
    winSound,
    loseSound,
    slotWheelSound,
    credits,
    isAutoSpinOn,
    finalSlotScreen,
    getTimerForNewSpin,
    onSpin,
    openModal,
  ]);
  // const worker = new Worker(new URL('../../../workers/shuffle-worker.ts', import.meta.url));
  useEffect(() => {
    const shuffledReels = getShuffledReels();
    setReels(shuffledReels);
    setGameConfigs();
    /*     worker.postMessage('hello');

    worker.onmessage = event => {
    console.log(777, event)
      worker.terminate();
    };
 */
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isMusicOn && userAlreadyInteract) {
      return playThemeMusic();
    }

    themeMusic.pause();
  }, [isMusicOn, themeMusic, playThemeMusic, userAlreadyInteract]);

  useEffect(() => {
    const updateSetUserAlreadyInteract = (): void => setUserAlreadyInteract(true);
    document.addEventListener('click', updateSetUserAlreadyInteract);
    return () => document.removeEventListener('click', updateSetUserAlreadyInteract);
  }, []);

  return (
    <div className={styles['slot-machine']}>
      <WinsDisplay />
      <ReelsContext.Provider value={{ symbolSize, onReelAnimationEnd, onSpinningEnd }}>
        <Reels reels={reels} />
      </ReelsContext.Provider>
      <Controllers isSpinning={isSpinning} onSpin={onSpin} />
    </div>
  );
};

export { SlotMachine };
