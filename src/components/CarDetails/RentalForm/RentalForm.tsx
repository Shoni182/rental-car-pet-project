import css from './RentalForm.module.css';

type RentalFormProps = {
  carId: string;
};

export default function RentalForm({ carId }: RentalFormProps) {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form}>
        <input className={css.input} type="text" placeholder="Name*" />
        <input className={css.input} type="email" placeholder="Email*" />
        <textarea className={css.textarea} placeholder="Comment" />
        <button className={css.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
