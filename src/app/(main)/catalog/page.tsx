'use client';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api';
// import { CarResponse } from '@/types/car';

import React from 'react';

function Catalog() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['cars'],
    queryFn: ({ pageParam }) => fetchCars({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.totalPages > lastPage.page
        ? lastPage.page + 1
        : undefined;
    },
  });

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((catalog, i) => (
        <React.Fragment key={i}>
          {catalog.data.map((cars) => (
            <CarCard
              key={cars.id}
              brand={cars.brand}
              id={cars.id}
              img={cars.img}
              model={cars.model}
              year={cars.year}
              rentalPrice={cars.rentalPrice}
              location={{
                country: cars.location.country,
                city: cars.location.city,
                address: cars.location.address,
              }}
              rentalCompany={cars.rentalCompany}
              type={cars.type}
              mileage={cars.mileage}
            />
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'LoadMore'
              : 'Noting more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}

export default Catalog;
