This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Vercel Deployment Notes

### 1. Database Setup (Neon/PostgreSQL)
This project uses Prisma with PostgreSQL. For Vercel deployment:
- Set `DATABASE_URL` and `DIRECT_URL` in Vercel Environment Variables.
- Ensure your database schema is up-to-date by running `npx prisma db push` or `npx prisma migrate deploy` in your CI/CD or local machine before deploying.

### 2. File Uploads
**Important:** The current implementation saves student photos to the local `public/uploads` directory. **This will not work on Vercel** as the filesystem is read-only. 
- For production, consider using **Vercel Blob**, **Cloudinary**, or **Supabase Storage**.
- To make it work temporarily on Vercel (without photo persistence), you would need to refactor the API to use a cloud provider.

### 3. Environment Variables
Ensure the following are set:
- `DATABASE_URL`
- `DIRECT_URL`

