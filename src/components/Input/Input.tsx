import { InputHTMLAttributes } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import cn from "classnames";

import styles from "./styles.module.css";

export interface TextInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: Path<T>;
}

function Input<T extends FieldValues>({
  name = "" as Path<T>,
  className,
  ...props
}: TextInputProps<T>) {
  const formContext = useFormContext();
  const register = formContext ? formContext.register : undefined;

  return (
    <input
      className={cn(styles.input, {
        [className!]: Boolean(className),
      })}
      {...props}
      {...register?.(name)}
    />
  );
}

export default Input;
