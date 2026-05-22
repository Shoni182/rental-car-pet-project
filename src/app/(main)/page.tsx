import type { Metadata } from 'next';
import Button from '@/components/ui/Button/Button';
import css from './page.module.css';
import Container from '@/components/ui/Container/Container';

export const metadata: Metadata = {
  title: 'Home | Rental Car',
  description:
    'Find your perfect rental car. Reliable and budget-friendly rentals for any journey.',
  openGraph: {
    title: 'Home | Rental Car',
    description:
      'Find your perfect rental car. Reliable and budget-friendly rentals for any journey.',
    url: 'https://rental-car-pet-project.vercel.app',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1440,
        height: 700,
        alt: 'Rental Car logo image',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <section className={css.homeSection}>
      <Container>
        <div className={css.homeContainer}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <h2 className={css.subTitle}>
            Reliable and budget-friendly rentals for any journey
          </h2>
          <Button
            target={false}
            path="/catalog"
            text="View Catalog"
            padding={[12, 99]}
            buttonVariant="primaryButton"
          />
        </div>
      </Container>
    </section>
  );
}
