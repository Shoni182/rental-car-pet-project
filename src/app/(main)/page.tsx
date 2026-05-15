import Button from '@/components/ui/Button/Button';
import css from './page.module.css';

export default function HomePage() {
  return (
    <section className={css.homeSection}>
      <div className={css.homeContainer}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subTitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Button
          path="/catalog"
          text="View Catalog"
          padding={[12, 99]}
          buttonVariant="primaryButton"
        />
      </div>
    </section>
  );
}
