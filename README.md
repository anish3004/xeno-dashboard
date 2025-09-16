# Xeno Dashboard (Next.js)

## Overview
Next.js dashboard to visualize Shopify-ingested data (KPIs, charts, lists). Uses Prisma to read from the same Neon DB.

## Quick start
1. `cd xeno-dashboard`
2. `npm install`
3. Create `.env` (see example below)
4. `npx prisma generate`
5. `npm run dev`
6. Open http://localhost:3000

## Setup Instructions
# 1. Clone repoitories:
# Frontend
git clone https://github.com/anish3004/xeno-dashboard.git
cd xeno-dashboard

# Backend
git clone https://github.com/anish3004/xeno-backend.git
cd xeno-backend

# 2. Install Dependencies
# For both repos
npm install

# 3. Configure environment variables
Create a .env file in the backend folder:
DATABASE_URL="postgresql://<username>:<password>@<host>/<dbname>?sslmode=require"
PORT=5000
For the frontend (xeno-dashboard), create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000

# 4. Run the database migrations
npx prisma migrate dev --name init
npx prisma db seed   # if you have seeding scripts

# 5. Start development servers
# Backend
cd xeno-backend
npm run dev

# Frontend
cd xeno-dashboard
npm run dev



## .env example
DATABASE_URL="db_url"
NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password123"

## Demo credentials
Email: test@example.com
Password: password123

## Features
- Total customers, orders, revenue
- Revenue trend chart (30 days)
- Top 5 customers by spend
- Customers & orders lists
- Email auth (NextAuth) or demo login

## Architecture Diagram
                ┌─────────────────────────┐
                │        Frontend          │
                │  Next.js + Tailwind UI   │
                │  (xeno-dashboard)        │
                └─────────────▲───────────┘
                              │ API Calls (REST)
                              ▼
                ┌─────────────────────────┐
                │         Backend          │
                │ Node.js + Express + ORM  │
                │  (xeno-backend)          │
                └─────────────▲───────────┘
                              │ Prisma Queries
                              ▼
                ┌─────────────────────────┐
                │       Database           │
                │ PostgreSQL on Neon DB    │
                └─────────────────────────┘


## Troubleshooting
- If `nodemailer` missing: `npm i nodemailer`
- If `react-datepicker` missing (reports date range): `npm i react-datepicker`
- If Prisma client missing: `npx prisma generate`

## API Endpoints
Dashboard Routes

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/dashboard/orders`    | Get order statistics by date  |
| GET    | `/api/dashboard/customers` | Get top customers by spending |
| GET    | `/api/dashboard/revenue`   | Get total revenue summary     |

Customer Routes

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/customers` | Fetch all customers |
| POST   | `/api/customers` | Add a new customer  |

Order Routes

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/api/orders` | Fetch all orders   |
| POST   | `/api/orders` | Create a new order |

## DataBase Schema

model Customer {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  orders    Order[]
  createdAt DateTime @default(now())
}

model Order {
  id         Int      @id @default(autoincrement())
  amount     Float
  date       DateTime @default(now())
  customer   Customer @relation(fields: [customerId], references: [id])
  customerId Int
}




