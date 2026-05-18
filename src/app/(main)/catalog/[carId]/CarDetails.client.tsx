'use client';
import css from './CarDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchCarById } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

// components
import CarFeatures from '@/components/CarDetails/CarFeatures/CarFeatures';
import CarInfo from '@/components/CarDetails/CarInfo/CarInfo';
import CarSpecs from '@/components/CarDetails/CarSpecs/CarSpecs';
import RentalForm from '@/components/CarDetails/RentalForm/RentalForm';

const CarDetails = () => {
  const { carId } = useParams();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId as string),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error || !car) {
    return toast.error('Не вдалося завантажити дані автомобіля');
  }

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
        <RentalForm carId={car.id} />
      </div>

      {/* Права Колонка  */}

      <div className={css.rightCollumn}>
        <CarInfo
          brand={car.brand}
          model={car.model}
          year={car.year}
          rentalPrice={car.rentalPrice}
          location={{
            city: car.location.city,
            country: car.location.country,
          }}
          description={car.description}
          rentalConditions={car.rentalConditions}
        />
        <div className={css.divider}></div>
        <CarSpecs
          year={car.year}
          type={car.type}
          fuelConsumption={car.fuelConsumption}
          engine={car.engine}
          mileage={car.mileage}
        />
        <div className={css.divider}></div>
        <CarFeatures features={car.features} />
      </div>
    </div>
  );
};

export default CarDetails;
