'use client';
import css from './Filters.module.css';
import { CarFilter, FilterTypes } from '@/types/car';
import { useState, useEffect, useRef } from 'react';
import { fetchFilters } from '@/lib/api';

interface FilterProps {
  onFilter: (filters: CarFilter) => void;
}

export default function Filters({ onFilter }: FilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterTypes | null>(null);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const dropDownRef = useRef<HTMLDivElement>(null);

  //: Дістаємо значення фільтру

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await fetchFilters();

        setFilterOptions(data);
      } catch {
        //   Error component
        console.error('Failed to load filters');
      }
    };
    void loadFilters();
  }, []);

  //: Close dropdown when cliking outside

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
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
        <div className={css.dropdownWrapper} ref={dropDownRef}>
          <div
            className={css.dropdownTrigger}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <div className={css.selectedOptions}>
              {selectedBrands.length === 0 ? (
                <span className={css.placeholder}>Choose a brand </span>
              ) : (
                selectedBrands.map((brand) => (
                  <span key={brand} className={css.option}>
                    {brand}
                  </span>
                ))
              )}
            </div>
            <span
              className={`${css.chevron} ${isDropdownOpen ? css.chevronOpen : ''}`}
            >
              ▾
            </span>
          </div>

          {/* Dropdown list */}
          {isDropdownOpen && (
            <div className={css.dropdownList}>
              {filterOptions?.brands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBrands((prev) => [...prev, brand]);
                      } else {
                        setSelectedBrands((prev) =>
                          prev.filter((b) => b !== brand),
                        );
                      }
                    }}
                  />
                  {brand}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
