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

export default function CarInfo({
  brand,
  model,
  year,
  id,
  rentalPrice,
  location,
  description,
  rentalConditions,
}: CarInfoProps) {
  return (
    <div>
      <h2>
        {brand} {model},{year}
      </h2>
      <span>
        <svg width={16} height={16}>
          <use href="/sprites.svg#icon-map-pin" />
        </svg>
        {location.city}, {location.country}
      </span>

      <h2>{rentalPrice}</h2>
      <p>{description}</p>

      <h3>Rental Conditions:</h3>
      <ul>
        {rentalConditions.map((e) => (
          <li key={e}>
            <span>
              <svg width={16} height={16}>
                <use href="/sprites.svg#icon-check-circle" />
              </svg>
              <p>{e}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
