import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonIcon, Select } from '@/components';
import { MusicSvg, SoundSvg, SunMoonSvg } from '@/assets/svg';
import { LOCALES_DATA } from '@/constants';
import { State } from '@/store/types';
import { Theme } from '@/types';
import {
  LANGUAGE_CHANGED,
  MUSIC_STATE_CHANGED,
  SOUND_STATE_CHANGED,
  THEME_CHANGED,
} from '@/store/action-types';
import styles from './styles.module.scss';

const Settings: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const isSoundOn = useSelector((state: State) => state.settings.isSoundOn);
  const isMusicOn = useSelector((state: State) => state.settings.isMusicOn);
  const currentTheme = useSelector((state: State) => state.settings.currentTheme);
  const currentLanguage = useSelector((state: State) => state.settings.currentLanguage);

  const onLanguageUpdate = (event: MouseEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    onUpdateSettingsState(LANGUAGE_CHANGED, target.value);
  };

  const onThemeUpdate = () => {
    const newTheme: Theme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    onUpdateSettingsState(THEME_CHANGED, newTheme);
  };

  const onUpdateSettingsState = (actionType: string, newValue: unknown) => {
    const action = { type: actionType, payload: newValue };
    dispatch(action);
  };

  return (
    <div className={styles['settings']}>
      <div className={styles['settings__buttons']}>
        <ButtonIcon
          icon={MusicSvg}
          aria-label={t('settings.changeMusicStatus', {
            status: isMusicOn ? t('settings.mute') : t('settings.unmute'),
          })}
          title={t('settings.changeMusicStatus', {
            status: isMusicOn ? t('settings.mute') : t('settings.unmute'),
          })}
          onClick={() => onUpdateSettingsState(MUSIC_STATE_CHANGED, !isMusicOn)}
        />
        <ButtonIcon
          icon={SoundSvg}
          aria-label={t('settings.changeSoundsStatus', {
            status: isSoundOn ? t('settings.mute') : t('settings.unmute'),
          })}
          title={t('settings.changeSoundsStatus', {
            status: isSoundOn ? t('settings.mute') : t('settings.unmute'),
          })}
          onClick={() => onUpdateSettingsState(SOUND_STATE_CHANGED, !isSoundOn)}
        />
        <ButtonIcon
          icon={SunMoonSvg}
          aria-label={t('settings.changeDarkMode', {
            status: currentTheme === Theme.DARK ? t('global.disable') : t('global.enable'),
          })}
          title={t('settings.changeDarkMode', {
            status: currentTheme === Theme.DARK ? t('global.disable') : t('global.enable'),
          })}
          onClick={onThemeUpdate}
        />
      </div>
      <Select
        name="language-picker"
        value={currentLanguage}
        label={t('settings.language')}
        aria-label={t('settings.changeLanguage')}
        title={t('settings.changeLanguage')}
        options={LOCALES_DATA}
        additionalClass={styles['settings__select']}
        onChange={onLanguageUpdate}
      />
    </div>
  );
};

export { Settings };
