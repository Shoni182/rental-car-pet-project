'use client';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { bookingRequest } from '@/lib/api';
import css from './RentalForm.module.css';

type RentalFormProps = {
  carId: string;
};

const rentalFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email('Некоректний email')
    .required("Email є обов'язковим"),
  comment: Yup.string(),
});

export default function RentalForm({ carId }: RentalFormProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: { name: string; email: string; comment: string }) =>
      bookingRequest(carId, values),
    onSuccess: () => toast.success('Заявка прийнята!'),
    onError: () => toast.error('Ой лишенько, виникла помилка!'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', comment: '' }}
      validationSchema={rentalFormSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values, { onSuccess: () => resetForm() });
      }}
    >
      {({ errors, touched }) => (
        <div className={css.container}>
          <h3 className={css.title}>Book your car now</h3>
          <p className={css.subtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <Form className={css.form}>
            <label className={css.label}>
              <Field
                name="name"
                type="text"
                placeholder="Name*"
                className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={css.textarea}
              />
            </label>

            <button className={css.button} type="submit" disabled={isPending}>
              {isPending ? 'Sending...' : 'Send'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
