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

## .env example
DATABASE_URL="postgresql://neondb_owner:npg_VNCfc5pEIF9s@ep-wandering-band-a14c0iw5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
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

## Troubleshooting
- If `nodemailer` missing: `npm i nodemailer`
- If `react-datepicker` missing (reports date range): `npm i react-datepicker`
- If Prisma client missing: `npx prisma generate`
