import type { Metadata } from 'next';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Rental Car',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 — Page Not Found | Rental Car',
    description: 'The page you are looking for does not exist.',
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

export default function NotFound() {
  return (
    <div>
      {' '}
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
