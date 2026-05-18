import css from './CarInfo.module.css';
type CarInfoProps = {
  brand: string;
  model: string;
  year: number;
  rentalPrice: string;
  location: { city: string; country: string };
  description: string;
  rentalConditions: string[];
};

export default function CarInfo({
  brand,
  model,
  year,
  rentalPrice,
  location,
  description,
  rentalConditions,
}: CarInfoProps) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {brand} {model}, {year}
      </h2>

      <span className={css.addressItem}>
        <svg width={16} height={16} className={css.icon}>
          <use href="/sprites.svg#icon-map-pin" />
        </svg>
        {location.city}, {location.country}
      </span>

      <h2 className={css.price}>${rentalPrice}</h2>

      <p className={css.description}>{description}</p>

      <h3 className={css.conditionsTitle}>Rental Conditions:</h3>
      <ul className={css.listContainer}>
        {rentalConditions.map((e) => (
          <li key={e}>
            <span className={css.item}>
              <svg width={16} height={16} className={css.icon}>
                <use href="/sprites.svg#icon-check-circle" />
              </svg>
              {e}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
