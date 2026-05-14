import css from './Button.module.css';

export default function Button({ text }: { text: string }) {
  return <button className={css.button}>{text}</button>;
}
