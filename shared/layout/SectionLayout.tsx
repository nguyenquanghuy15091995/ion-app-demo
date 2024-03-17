import { LayoutType } from "@prisma/client";
import clsx from "clsx";
import { HTMLAttributes } from "react";

type SectionLayoutProps = HTMLAttributes<HTMLDivElement> & {
  layoutType?: LayoutType;
}

const SectionLayout = ({ layoutType, children, className, ...props }: SectionLayoutProps) => {
  return (
    <>
      <section
        aria-label={layoutType?.name || ""}
        className={clsx(
          layoutType?.code === "grid_r1_c1" ? "grid grid-cols-1" : undefined,
          className
        )}
        {...props}
      >
        <div className="p-2 flex items-center justify-center">
          {children}
        </div>
      </section>
    </>
  );
}

export default SectionLayout;
