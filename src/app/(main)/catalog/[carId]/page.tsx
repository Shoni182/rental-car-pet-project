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

// metadata

// server prefetch

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
