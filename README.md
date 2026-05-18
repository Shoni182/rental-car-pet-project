# 🚗 Rental Car — Car Booking App

A modern web application for browsing and booking rental cars.
Built with ❤️ using Next.js and modern frontend technologies.

---

## 🚀 Features

- 🚘 Browse a full catalog of rental cars
- 🔍 Filter by brand, price, and mileage
- 📄 Detailed car page with specs, features, and rental conditions
- 📝 Booking request form with validation
- 🔔 Toast notifications for actions and errors
- ♾️ Infinite scroll / Load More pagination
- ⚡ Fast performance with Next.js App Router and SSR prefetch

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** CSS Modules
- **State Management:** Zustand (filters), TanStack Query (server state)
- **HTTP Requests:** Axios
- **Forms & Validation:** Formik + Yup
- **Notifications:** react-hot-toast
- **Other:** ESLint, Prettier

---

## 📦 Installation

```bash
git clone https://github.com/your-username/rental-car-pet-project.git
cd rental-car-pet-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

This project uses a public API and does not require environment variables by default.
If needed, create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
```

---

## 📁 Project Structure

```
src/
 ├── app/
 │    ├── layout.tsx
 │    ├── not-found.tsx
 │    └── (main)/
 │         ├── page.tsx
 │         └── catalog/
 │              ├── page.tsx
 │              └── [carId]/
 ├── components/
 │    ├── CarCard/
 │    ├── CarDetails/
 │    ├── Filters/
 │    ├── Header/
 │    ├── TanStackProvider/
 │    └── ui/
 ├── lib/
 │    └── api.ts
 ├── store/
 │    └── filterStore.ts
 └── types/
      └── car.ts
public/
 ├── images/
 └── sprites.svg
```

---

## 👨‍💻 Author

**Shoni Pal** — aspiring Frontend Developer 🚀
