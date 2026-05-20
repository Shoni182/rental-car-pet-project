import type { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import css from './Container.module.css';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={clsx(css.container, className)} {...props}>
      {children}
    </div>
  );
}
