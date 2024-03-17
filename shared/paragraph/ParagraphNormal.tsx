import { HTMLAttributes } from "react";

export type ParagraphNormalProps = HTMLAttributes<HTMLParagraphElement>;

const ParagraphNormal = ({ children, ...props }: ParagraphNormalProps) => {
  return (
    <p aria-label="normal paragraph" {...props}>{children}</p>
  );
}

export default ParagraphNormal;
