'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Помилка при завантаженні деталей вибраного автомобілю!</h2>
      <p>Could not fetch car details. {error.message}</p>
      <button onClick={reset}>Спробувати знову</button>
    </div>
  );
};

export default Error;
