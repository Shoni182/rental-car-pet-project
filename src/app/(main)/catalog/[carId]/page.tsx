// libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
// components
import CarDetails from './CarDetails.client';
import { fetchCarById } from '@/lib/api';
import type { Metadata } from 'next';

// типізація
type Props = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;
  const car = await fetchCarById(carId); // fetch мемоізується, не повториться

  return {
    title: `${car.brand} ${car.model}| Rental Car`,
    description:
      `${car.description}` ||
      'View detailed information about your selected rental car and book it now.',
    openGraph: {
      title: `${car.brand} ${car.model}| Rental Car`,
      description:
        'View detailed information about your selected rental car and book it now.',
      url: `https://rental-car-pet-project.vercel.app/catalog/${carId}`,
      images: [
        {
          url: car.img || '/images/og-image.jpg',
          width: 640,
          height: 640,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

const CarPage = async ({ params }: Props) => {
  const { carId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails />
    </HydrationBoundary>
  );
};

export default CarPage;
