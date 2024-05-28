import styles from './Button.module.scss';

export const Button = (props: any) => {
  return <button {...props} className={styles['button']} />;
};
