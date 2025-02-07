import { HTMLProps } from "react";
import classNames from "classnames";

type ButtonTextProps = Omit<HTMLProps<HTMLParagraphElement>, "children"> & {
  text: string;
};

const ButtonText = ({ text, className, ...props }: ButtonTextProps) => {
  return (
    <p className={classNames({ [className!]: Boolean(className) })} {...props}>
      {text}
    </p>
  );
};

export default ButtonText;
