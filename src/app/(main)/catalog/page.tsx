'use client';
import CarCard from '@/components/CarCard/CarCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api';
import css from './page.module.css';
import Filters from '@/components/Filters/Filters';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// import type { Metadata } from 'next';

// import Button from '@/components/ui/Button/Button';

import React, { useState } from 'react';
import { CarFilter } from '@/types/car';
import { useSearchParams } from 'next/navigation';

function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<CarFilter>({
    brand: searchParams.get('brand') ?? '',
    price: searchParams.get('price') ? Number(searchParams.get('price')) : null,
    mileageFrom: searchParams.get('mileageFrom') ?? '',
    mileageTo: searchParams.get('mileageTo') ?? '',
  });

  const handleFilter = (newFilters: CarFilter) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.brand) params.set('brand', newFilters.brand);
    if (newFilters.price) params.set('price', String(newFilters.price));
    if (newFilters.mileageFrom)
      params.set('mileageFrom', newFilters.mileageFrom);
    if (newFilters.mileageTo) params.set('mileageTo', newFilters.mileageTo);
    router.push(`/catalog?${params.toString()}`);
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
            onClick={() => fetchNextPage()}
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
