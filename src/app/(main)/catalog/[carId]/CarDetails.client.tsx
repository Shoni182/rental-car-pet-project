'use client';
import css from './CarDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchCarById } from '@/lib/api';
import Image from 'next/image';

// components
import { CarFeatures } from '@/components/CarDetails/CarFeatures/CarFeatures';
import { CarInfo } from '@/components/CarDetails/CarInfo/CarInfo';
import { CarSpecs } from '@/components/CarDetails/CarSpecs/CarSpecs';
import { RentalForm } from '@/components/CarDetails/RentalForm/RentalForm';

// Вставити компоненти useQuery useParams та fetchcars by id
// створити функцію комопнент CarDetails
// в ній створити use params щоб забрати ід
// usequery
// loading error
// return структуру - написати її

const CarDetails = () => {
  const { id } = useParams();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', { id: id }],
    queryFn: () => fetchCarById(id as string),
    refetchOnMount: false,
  });

  if (isLoading) return <p>loading</p>;
  if (error || !car) return <p>Some error..</p>;

  return (
    <>
      {/* Ліва Колонка  */}

      <div>
        <Image alt="" className={css.carImage} />
        <RentalForm carId={car.id} />
      </div>

      {/* Права Колонка  */}
      <div>
        <CarInfo carId={car.id} />
        <CarSpecs carId={car.id} />
        <CarFeatures carId={car.id} />
      </div>
    </>
  );
};

export default CarDetails;
