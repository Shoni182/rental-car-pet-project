import css from './Button.module.css';
import Link from 'next/link';

interface ButtonProps {
  target: boolean;
  path: string;
  text: string;
  padding: number[];
  buttonVariant?: 'primaryButton' | 'secondaryButton';
}

export default function Button({
  target = false,
  path,
  text,
  padding = [],
  buttonVariant = 'primaryButton',
}: ButtonProps) {
  const style = css[buttonVariant];
  const paddingStyle = padding.map((p) => `${p}px`).join(' ');

  return (
    <Link
      href={path}
      target={target ? '_blank' : undefined}
      className={style}
      style={{ padding: paddingStyle }}
    >
      {text}
    </Link>
  );
}
