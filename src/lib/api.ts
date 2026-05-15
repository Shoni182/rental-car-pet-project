import { CarResponse, Car, FilterTypes, RentalFormData } from '@/types/car';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

// : GET all Cars
export const fetchCars = async ({
  brand,
  price,
  minMileage,
  maxMileage,
  page,
}: {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
}) => {
  const res = await axios.get<CarResponse>('/cars', {
    params: {
      brand: brand ?? undefined,
      price: price ?? undefined,
      minMileage: minMileage ?? undefined,
      maxMileage: maxMileage ?? undefined,
      page: page ?? 1,
    },
  });
  return res.data;
};

// : Get one Car
export const fetchCar = async (id: string) => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};

// : GET filters
export const fetchFilters = async () => {
  const res = await axios.get<FilterTypes>('/cars/filters');
  return res.data;
};

// : POST Bookign request
export const bookingRequest = async (carId: string, data: RentalFormData) => {
  const res = await axios.post<RentalFormData>(
    `/cars/${carId}/booking-requests`,
    data,
  );
  return res.data;
};
