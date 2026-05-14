import css from './Button.module.css';

interface ButtonProps {
  href: string;
  text: string;
  padding: number[];
  buttonVariant?: 'primaryButton' | 'secondaryButton';
}

export default function Button({
  href,
  text,
  padding = [],
  buttonVariant = 'primaryButton',
}: ButtonProps) {
  const style = css[buttonVariant];
  const paddingStyle = padding.map((p) => `${p}px`).join(' ');
  return (
    <button type="button" className={style} style={{ padding: paddingStyle }}>
      {text}
    </button>
  );
}
