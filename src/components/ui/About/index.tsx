import { JavascriptSvg, TypescriptSvg, ViteSvg } from '@/assets/svg';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const About: React.FC = () => {
  const [t] = useTranslation();

  const symbols = [
    { caption: 'wildcard', Icon: TypescriptSvg },
    { caption: 'scatter', Icon: JavascriptSvg },
    { caption: 'explosive', Icon: ViteSvg },
  ];

  return (
    <div className={styles.about}>
      <p>{t('about.description')}</p>
      <h2>{t('about.specialSymbols')}</h2>
      {symbols.map(({ caption, Icon }) => (
        <div key={`symbol-${caption}`} >
          <h3>{t(`about.${caption}`)}</h3>
          <div className={styles['about__symbol']}>
            <Icon />
            <p>{t(`about.${caption}Description`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { About };
