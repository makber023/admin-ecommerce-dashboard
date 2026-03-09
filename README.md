# 🛒 Admin E-Commerce Dashboard

A full-stack e-commerce admin dashboard built with **Next.js 14**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Tailwind CSS**. Includes a customer-facing storefront and a complete admin panel — all in a single monorepo using the Next.js App Router.

---

## 🚀 Tech Stack

| Tech                                          | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| [Next.js 14](https://nextjs.org/)             | Full-stack React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                             |
| [Prisma ORM](https://www.prisma.io/)          | Database access & migrations            |
| [PostgreSQL](https://www.postgresql.org/)     | Relational database                     |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling                   |
| [NextAuth.js](https://next-auth.js.org/)      | Authentication                          |

---

## ✨ Features

### Admin Panel

- 📦 Product management (create, edit, delete)
- 🗂️ Category management
- 👥 User management
- 📊 Admin dashboard overview

### Customer Storefront

- 🛍️ Browse products and collections
- 🔍 Product detail pages
- 🛒 Shopping cart
- 💳 Checkout flow
- 🔐 Sign up / Sign in

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (customer)/
│   │   ├── (with-header)/       # Pages with navigation header
│   │   │   ├── products/
│   │   │   ├── product/[slug]/
│   │   │   └── collections/
│   │   └── (without-header)/    # Pages without header
│   │       ├── cart/
│   │       └── checkout/
│   ├── admin/                   # Admin panel
│   │   ├── products/
│   │   ├── categories/
│   │   └── users/
│   ├── api/                     # API routes
│   └── auth/                    # Auth pages
│   │   ├── signin/
│   │   └── signup/
├── components/
├── lib/
├── store/
└── types/
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/makber023/admin-ecommerce-dashboard.git
cd admin-ecommerce-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/your_db_name"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Run Prisma migrations**

```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🗄️ Database

This project uses **Prisma** with **PostgreSQL**. To view and manage your data visually:

```bash
npx prisma studio
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
