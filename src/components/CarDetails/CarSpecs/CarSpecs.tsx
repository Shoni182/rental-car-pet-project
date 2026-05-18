type CarSpecsProps = {
  year: number;
  type: string;
  fuelConsumption: string;
  engine: string;
  mileage: number;
};

export default function CarSpecs({ year, type, fuelConsumption, engine, mileage }: CarSpecsProps) {
  return <h1>CarSpecs</h1>;
}
