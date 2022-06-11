import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { State } from '@/store/types';
import { ShareSvg } from '@/assets/svg';
import { ToastType } from '@/types';
import { ButtonIcon } from '@/components';
import { JS_SLOTS_URL } from '@/constants';
import { ToastContext, ToastContextData } from '@/context/ToastContext';
import { BubblePressSound } from '@/assets/sounds';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const [t] = useTranslation();
  const { addToast } = useContext<ToastContextData>(ToastContext);
  const isSoundOn = useSelector((state: State) => state.settings.isSoundOn);
  const bubblePressSound: HTMLAudioElement = new Audio(BubblePressSound);

  const share = async () => {
    if (typeof navigator !== 'undefined' && !navigator.share) {
      navigator.clipboard.writeText(JS_SLOTS_URL);
      return addToast({ message: t('header.copiedToClipboard'), type: ToastType.INFO });
    }

    const shareData = {
      title: t('header.shareTitle'),
      text: t('header.shareText'),
      url: JS_SLOTS_URL,
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      addToast({ message: t('header.shareError'), type: ToastType.ALERT });
    }
  };

  return (
    <header className={styles.header}>
      <h1>{t('header.welcome')}</h1>
      <ButtonIcon
        icon={ShareSvg}
        aria-label={t('header.share')}
        title={t('header.share')}
        buttonSound={isSoundOn ? bubblePressSound : null}
        onClick={share}
      />
    </header>
  );
};

export { Header };
