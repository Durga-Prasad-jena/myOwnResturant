import { FC } from "react";
import styles from './input.module.scss';
import { InputProps } from "./input.types";

export const InputField: FC<Partial<InputProps>> = ({ label, type, style }) => {
  return (
    <>
      {label && <label className={styles.labelField}>{label}</label>}
      <input
        type={type}
        className='form-control'
        style={style}
      />
    </>
  );
};