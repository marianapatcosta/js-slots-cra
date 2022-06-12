import { useTranslation } from 'react-i18next';
import { LINKS } from '@/constants';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
  const [t] = useTranslation();

  return (
    <footer className={styles.footer}>
      <p>@2022 {t('footer.developedBy', { name: 'Mariana Costa' })}</p>
      <div className={styles['footer__links']}>
        {LINKS.map(link => {
          const Icon = link.icon;
          return (
            <a
              key={`link-to-${link.label}`}
              href={link.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={t('footer.findMe', { link: link.label })}
              title={t('footer.findMe', { link: t(link.label) })}
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export { Footer };
