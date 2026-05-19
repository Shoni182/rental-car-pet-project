import { CarResponse, Car, FilterTypes, BookingResponse } from '@/types/car';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.study';

//GET all Cars
export const fetchCars = async ({
  brand,
  price,
  minMileage,
  maxMileage,
  page,
  perPage,
}: {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
  perPage: number;
}) => {
  const res = await axios.get<CarResponse>('/cars', {
    params: {
      brand: brand ?? undefined,
      price: price ?? undefined,
      minMileage: minMileage ?? undefined,
      maxMileage: maxMileage ?? undefined,
      page: page ?? 1,
      perPage: perPage,
    },
  });
  return res.data;
};

//Get one Car
export const fetchCarById = async (id: string) => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};

//GET filters
export const fetchFilters = async () => {
  const res = await axios.get<FilterTypes>('/cars/filters');
  return res.data;
};

//POST Booking request
export const bookingRequest = async (carId: string, data: BookingResponse) => {
  const res = await axios.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    data,
  );
  return res.data;
};
