import clsx from "clsx";
import { HTMLAttributes } from "react";

export type ButtonNormalProps = HTMLAttributes<HTMLButtonElement>;

const ButtonNormal = ({ children, className, ...props }: ButtonNormalProps) => {
  return (
    <button aria-label="normal button" className={clsx("p-2 rounded bg-gray-200 shadow-lg border", className)} {...props}>{children}</button>
  );
}

export default ButtonNormal;
