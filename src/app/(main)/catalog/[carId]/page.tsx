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
  params: Promise<{ id: string }>;
};

// metadata

// server prefetch

const CarPage = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails />
    </HydrationBoundary>
  );
};

export default CarPage;
