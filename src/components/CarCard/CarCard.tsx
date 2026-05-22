import css from './CarCard.module.css';
import Image from 'next/image';

// import Button from '../ui/Button/Button';
import { Car } from '@/types/car';
import Link from 'next/link';

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

      <div className={css.tagsContainer}>
        <span className={css.tag}>{location.city}</span>
        <span className={css.tag}>{location.country}</span>
        <span className={css.tag}>{rentalCompany}</span>
        <span className={css.tag}>{type}</span>
        <span className={css.tag}>{mileage.toLocaleString('uk-UA')} km</span>
      </div>

      <Link href={`/catalog/${id}`} target={'_blank'} className={css.button}>
        Read more
      </Link>
    </li>
  );
}
