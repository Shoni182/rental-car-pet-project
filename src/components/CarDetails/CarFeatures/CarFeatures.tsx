import css from './CarFeature.module.css';
type CarFeaturesProps = {
  features: string[];
};

export default function CarFeatures({ features }: CarFeaturesProps) {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Rental Conditions:</h3>
      <ul className={css.listContainer}>
        {features.map((e) => (
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
