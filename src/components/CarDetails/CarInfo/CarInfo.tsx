type CarInfoProps = {
  brand: string;
  model: string;
  year: number;
  id: string;
  rentalPrice: string;
  location: { city: string; country: string };
  description: string;
  rentalConditions: string[];
};

export default function CarInfo() {
  return <h1>CarInfo</h1>;
}
