'use client';
import css from './Filters.module.css';
import { CarFilter, FilterTypes } from '@/types/car';
import { useState, useEffect, useRef } from 'react';
import { fetchFilters } from '@/lib/api';
import toast from 'react-hot-toast';

// import Image from 'next/image';

interface FilterProps {
  onFilter: (filters: CarFilter) => void;
}

function buildPriceOptions(min: number, max: number) {
  const arr: number[] = [];
  for (let i = min; i <= max; i += 10) arr.push(i);
  return arr;
}

export default function Filters({ onFilter }: FilterProps) {
  // Dropdown of the option list
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const brandsDropDownRef = useRef<HTMLDivElement>(null);
  const pricesDropDownRef = useRef<HTMLDivElement>(null);

  // All inpue data
  const [filterOptions, setFilterOptions] = useState<FilterTypes | null>(null);
  // Selected options
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  // Entered Mileage
  const [minMileage, setMinMileage] = useState<number | ''>('');
  const [maxMileage, setMaxMileage] = useState<number | ''>('');

  const priceOptions = filterOptions?.price
    ? buildPriceOptions(filterOptions.price.min, filterOptions.price.max)
    : [];

  function handleReset() {
    setSelectedBrand([]);
    setSelectedPrice([]);
    setMinMileage('');
    setMaxMileage('');
    onFilter({ brand: '', price: null, mileageFrom: '', mileageTo: '' });
  }

  //: Дістаємо значення фільтру

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await fetchFilters();

        setFilterOptions(data);
      } catch {
        toast.error('Не вдалося завантажити фільтри');
      }
    };
    void loadFilters();
  }, []);

  //: Close dropdown when cliking outside

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!brandsDropDownRef.current?.contains(e.target as Node)) {
        setIsBrandDropdownOpen(false);
      }
      if (!pricesDropDownRef.current?.contains(e.target as Node)) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    //: Контейнер для фільтрів
    <div className={css.filterContainer}>
      {/* Brands */}
      <div className={css.selectContainter}>
        <p className={css.title}>Car brand</p>
        <div className={css.dropdownWrapper} ref={brandsDropDownRef}>
          <div
            className={css.dropdownTrigger}
            onClick={() => setIsBrandDropdownOpen((prev) => !prev)}
          >
            <div className={css.selectedOptions}>
              {selectedBrand.length === 0 ? (
                <span className={css.placeholder}>Choose a brand </span>
              ) : (
                selectedBrand.map((brand) => (
                  <span key={brand} className={css.selectedOption}>
                    {brand}
                  </span>
                ))
              )}
            </div>
            <svg
              className={`${css.chevron} ${isBrandDropdownOpen ? css.chevronOpen : ''}`}
              width={13}
              height={13}
            >
              <use href="/sprites.svg#icon-chevron-down"></use>
            </svg>
          </div>

          {/* Dropdown list */}
          {isBrandDropdownOpen && (
            <div className={css.dropdownList}>
              {filterOptions?.brands.map((brand) => (
                <div
                  key={brand}
                  onClick={() => setSelectedBrand([brand])}
                  className={`${css.dropdownItem} ${selectedBrand.includes(brand) ? css.dropdownItemActive : ''}`}
                >
                  {brand}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prices */}
      <div className={css.selectContainter}>
        <p className={css.title}>Price/1hour</p>
        <div className={css.dropdownWrapper} ref={pricesDropDownRef}>
          <div
            className={css.dropdownTrigger}
            onClick={() => setIsPriceDropdownOpen((prev) => !prev)}
          >
            <div className={css.selectedOptions}>
              {selectedPrice.length === 0 ? (
                <span className={css.placeholder}>Choose a price </span>
              ) : (
                selectedPrice.map((price) => (
                  <span key={price} className={css.selectedOption}>
                    {price}
                  </span>
                ))
              )}
            </div>
            <svg
              className={`${css.chevron} ${isPriceDropdownOpen ? css.chevronOpen : ''}`}
              width={13}
              height={13}
            >
              <use href="/sprites.svg#icon-chevron-down"></use>
            </svg>
          </div>

          {/* Dropdown list */}
          {isPriceDropdownOpen && (
            <div className={css.dropdownList}>
              {priceOptions?.map((price) => (
                <div
                  key={price}
                  onClick={() => setSelectedPrice([price])}
                  className={`${css.dropdownItem} ${selectedPrice.includes(price) ? css.dropdownItemActive : ''}`}
                >
                  {price}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inputs */}
      <div>
        <p className={css.title}>Car mileage /km</p>
        <div className={css.inputContainer}>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className={css.inputMin}
            placeholder="From"
            value={minMileage}
            onChange={(e) =>
              setMinMileage(e.target.value === '' ? '' : Number(e.target.value))
            }
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E', '.', '='].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {/* <ErrorMessage component="span" name="title" className={css.error} /> */}

          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className={css.inputMax}
            placeholder="To"
            value={maxMileage}
            onChange={(e) =>
              setMaxMileage(e.target.value === '' ? '' : Number(e.target.value))
            }
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E', '.', '='].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>

      <div className={css.buttonsContainer}>
        <button
          className={css.primaryButton}
          onClick={() =>
            onFilter({
              brand: selectedBrand[0] ?? '',
              price: selectedPrice[0] ?? null,
              mileageFrom: String(minMileage),
              mileageTo: String(maxMileage),
            })
          }
        >
          Search
        </button>
        <button className={css.secondaryButton} onClick={handleReset}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
