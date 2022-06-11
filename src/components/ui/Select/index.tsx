import { HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Option {
  value: string;
  caption: string;
}

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  options: Array<Option>;
  label?: string;
  additionalClass?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, additionalClass, ...rest }) => {
  const [t] = useTranslation();

  return (
    <label className={`${styles.select} ${additionalClass ? additionalClass : ''}`}>
      <p>{label}</p>
      <select {...rest}>
        {options.map(option => (
          <option key={`${label}-${t(option.caption)}`} value={option.value}>
            {t(option.caption)}
          </option>
        ))}
      </select>
    </label>
  );
};

export { Select };
