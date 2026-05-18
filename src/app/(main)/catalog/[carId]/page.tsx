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

export const metadata: Metadata = {
  title: 'Car Details | Rental Car',
  description:
    'View detailed information about your selected rental car and book it now.',
  openGraph: {
    title: 'Car Details | Rental Car',
    description:
      'View detailed information about your selected rental car and book it now.',
    url: 'https://rental-car-pet-project.vercel.app',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 640,
        height: 640,
        alt: 'Rental Car logo image',
      },
    ],
  },
};

// типізація
type Props = {
  params: Promise<{ carId: string }>;
};

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
