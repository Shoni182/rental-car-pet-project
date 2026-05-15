'use client';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api';
import css from './page.module.css';
import Button from '@/components/ui/Button/Button';

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
    <section>
      <div className={css.catalogContainer}>
        {data.pages.map((catalog, i) => (
          <React.Fragment key={i}>
            {(catalog.cars ?? []).map((cars) => (
              <CarCard
                key={cars.id}
                brand={cars.brand}
                id={cars.id}
                img={cars.img}
                model={cars.model}
                year={cars.year}
                rentalPrice={cars.rentalPrice}
                location={
                  cars.location ?? { country: '', city: '', address: '' }
                }
                rentalCompany={cars.rentalCompany}
                type={cars.type}
                mileage={cars.mileage}
              />
            ))}
          </React.Fragment>
        ))}

        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
          className={css.secondaryButton}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'LoadMore'
              : 'Noting more to load'}
        </button>

        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    </section>
  );
}

export default Catalog;
