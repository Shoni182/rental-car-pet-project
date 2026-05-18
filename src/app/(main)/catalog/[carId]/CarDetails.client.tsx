'use client';
import css from './CarDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchCarById } from '@/lib/api';
import Image from 'next/image';

// components
import CarFeatures from '@/components/CarDetails/CarFeatures/CarFeatures';
import CarInfo from '@/components/CarDetails/CarInfo/CarInfo';
import CarSpecs from '@/components/CarDetails/CarSpecs/CarSpecs';
import RentalForm from '@/components/CarDetails/RentalForm/RentalForm';

// Вставити компоненти useQuery useParams та fetchcars by id
// створити функцію комопнент CarDetails
// в ній створити use params щоб забрати ід
// usequery
// loading error
// return структуру - написати її

const CarDetails = () => {
  const { carId } = useParams();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', { id: carId }],
    queryFn: () => fetchCarById(carId as string),
    refetchOnMount: false,
  });

  if (isLoading) return <p>loading</p>;
  if (error || !car) return <p>Some error..</p>;

  return (
    <div className={css.carDetailsContainer}>
      {/* Ліва Колонка  */}

      <div className={css.leftCollumn}>
        <Image
          src={car.img}
          alt="ds"
          className={css.carImage}
          width={640}
          height={512}
        />
        <RentalForm />
      </div>

      {/* Права Колонка  */}

      <div className={css.rightCollumn}>
        <CarInfo />
        <div className={css.divider}></div>
        <CarSpecs />
        <div className={css.divider}></div>
        <CarFeatures />
      </div>
    </div>
  );
};

export default CarDetails;
