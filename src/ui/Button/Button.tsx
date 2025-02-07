import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

import ButtonText from "./ButtonText";

import styles from "./styles.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: "text" | "contained" | "outlined";
  className?: string;
  whitespaced?: boolean;
};

interface ButtonComponent extends FC<ButtonProps> {
  Text: typeof ButtonText;
}

const Button: ButtonComponent = ({
  children,
  variant = "text",
  className,
  whitespaced = false,
  ...props
}) => {
  const classes = whitespaced
    ? classNames({ [className!]: Boolean(className) })
    : classNames(
        styles.button,
        styles[variant],
        { [styles.disabled]: props.disabled },
        { [className!]: Boolean(className) }
      );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

Button.Text = ButtonText;

export default Button;
