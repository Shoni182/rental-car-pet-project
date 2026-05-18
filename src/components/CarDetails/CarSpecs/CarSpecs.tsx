import css from './CarSpecs.module.css';

type CarSpecsProps = {
  year: number;
  type: string;
  fuelConsumption: string;
  engine: string;
  mileage: number;
};

export default function CarSpecs({
  year,
  type,
  fuelConsumption,
  engine,
  mileage,
}: CarSpecsProps) {
  return (
    <div className={css.container}>
      <h3 className={css.specsTitle}>Car Specifications:</h3>
      <ul className={css.listContainer}>
        <li className={css.list}>
          <span className={css.item}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprites.svg#icon-check-circle" />
            </svg>
            Year: {year}
          </span>
        </li>

        <li className={css.list}>
          <span className={css.item}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprites.svg#icon-check-circle" />
            </svg>
            Type: {type}
          </span>
        </li>

        <li className={css.list}>
          <span className={css.item}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprites.svg#icon-check-circle" />
            </svg>
            Fuel Consumption: {fuelConsumption}
          </span>
        </li>

        <li className={css.list}>
          <span className={css.item}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprites.svg#icon-check-circle" />
            </svg>
            Engine: {engine}
          </span>
        </li>

        <li className={css.list}>
          <span className={css.item}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprites.svg#icon-check-circle" />
            </svg>
            Mileage: {mileage}km
          </span>
        </li>
      </ul>
    </div>
  );
}
