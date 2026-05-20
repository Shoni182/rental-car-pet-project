import css from './CarCard.module.css';
import Image from 'next/image';

import Button from '../ui/Button/Button';
import { Car } from '@/types/car';

type CarCardProps = Pick<
  Car,
  | 'id'
  | 'img'
  | 'brand'
  | 'model'
  | 'year'
  | 'rentalPrice'
  | 'location'
  | 'rentalCompany'
  | 'type'
  | 'mileage'
>;

export default function CarCard({
  id,
  img,
  brand,
  model,
  year,
  rentalPrice,
  location,
  rentalCompany,
  type,
  mileage,
}: CarCardProps) {
  return (
    <li className={css.carContainer}>
      <Image
        src={img}
        alt="car image"
        className={css.image}
        width={244}
        height={268}
      />
      {/* Name and Price */}
      <div className={css.titleContainer}>
        <p className={css.title}>
          {brand} <span className={css.model}>{model}</span>, {year}
        </p>
        <span className={css.price}>${rentalPrice}</span>
      </div>

      <div className={css.detailsContainer}>
        <span className={css.carDetails}>{location.city}</span>
        <span className={css.carDetails}>{location.country}</span>
        <span className={css.carDetails}>{rentalCompany}</span>
        <span className={css.carDetails}>{type}</span>
        <span className={css.carDetails}>{mileage}km</span>
      </div>

      <Button
        path={`/catalog/${id}`}
        text="Read more"
        target={true}
        padding={[12, 0]}
        buttonVariant="primaryButton"
      />
    </li>
  );
}
