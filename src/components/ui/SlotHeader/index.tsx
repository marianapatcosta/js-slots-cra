import { HTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface SlotHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  additionalClass?: string;
}

const SlotHeader: React.FC<SlotHeaderProps> = ({ title, additionalClass }) => {
  const titleArray: string[] = title.replace(/\s+/g, '').split('');

  return (
    <div className={`${styles.slot} ${additionalClass ? additionalClass : ''}`}>
      {titleArray.map((letter, index) => (
        <p className={styles['slot__letter']} key={`letter-${letter}-${index}`}>
          {letter}
        </p>
      ))}
      <div className={styles['slot__adapter']}></div>
      <div className={styles['slot__handler']}></div>
    </div>
  );
};

export { SlotHeader };
