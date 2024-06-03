import classNames from 'classnames';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

export const Input = forwardRef((props: any, refProp) => {
  const { isError, className, ...rest } = props;

  const classes = classNames(styles['input'], { [styles['input_error']]: isError }, className);

  return <input ref={refProp} className={classes} {...rest} />;
});
