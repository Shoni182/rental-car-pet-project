'use client';
import Link from 'next/link';
import css from './Header.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link href="/">
          <svg className={css.logo} width={104} height={16}>
            <use href="/sprites.svg#icon-rental-car-logo"></use>
          </svg>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link
                href="/"
                className={clsx(
                  css.navLink,
                  pathname === '/' && css.activeLink,
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={clsx(
                  css.navLink,
                  pathname === '/catalog' && css.activeLink,
                )}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
