'use client';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api';
import css from './page.module.css';
import Filters from '@/components/Filters/Filters';
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
import { CarFilter } from '@/types/car';
import { useFilterStore } from '@/store/filterStore';

function Catalog() {
  const { filters, setFilters } = useFilterStore();

  const handleFilter = (newFilters: CarFilter) => {
    setFilters(newFilters);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        brand: filters.brand || undefined,
        price: filters.price !== null ? Number(filters.price) : undefined,
        minMileage: filters.mileageFrom
          ? Number(filters.mileageFrom)
          : undefined,
        maxMileage: filters.mileageTo ? Number(filters.mileageTo) : undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      return lastPage.totalPages > currentPage ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <section>
      <Filters onFilter={handleFilter} />

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

        {/* Load More  */}
        {hasNextPage && (
          <button
            onClick={async () => {
              try {
                await fetchNextPage();
              } catch {
                toast.error('Не вдалося завантажити більше авто');
              }
            }}
            disabled={!hasNextPage || isFetching}
            className={css.secondaryButton}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}

        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    </section>
  );
}

export default Catalog;
