import { useTranslation } from 'react-i18next';
import { GithubSvg, LinkedinSvg, PortfolioSvg } from '@/assets/svg';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
  const [t] = useTranslation();
  const links = [
    {
      label: 'GitHub',
      icon: GithubSvg,
      url: 'https://github.com/marianapatcosta',
    },
    {
      label: 'Linkedin',
      icon: LinkedinSvg,
      url: 'https://www.linkedin.com/in/marianapatcosta/',
    },
    {
      label: 'personalWebsite',
      icon: PortfolioSvg,
      url: 'https://mariana-costa.web.app',
    },
  ];
  return (
    <footer className={styles.footer}>
      <p>@2022 {t('footer.developedBy', { name: 'Mariana Costa' })}</p>
      <div className={styles['footer__links']}>
        {links.map(link => {
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
