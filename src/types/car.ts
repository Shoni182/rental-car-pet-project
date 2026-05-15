//: Car
export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
};

//: Filter
export type FilterTypes = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

//: Response
export type CarResponse = {
  data: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

//: Form
export type RentalFormData = {
  name: string;
  email: string;
  comment: string;
};
//: Form Response
export type BookingResponse = {
  message: string;
};
