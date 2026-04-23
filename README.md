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

## Quote Form Email Setup (Resend)

The quote form submits to an API route that sends two emails:

1. A quote request email to your inbox.
2. A confirmation email to the sender.

Create a `.env.local` file in the project root with:

```bash
RESEND_API_KEY=your_resend_api_key
QUOTE_RECEIVER_EMAIL=you@yourdomain.com
RESEND_FROM_EMAIL=Sterivio <noreply@yourdomain.com>
```

Notes:

- `RESEND_FROM_EMAIL` must be a verified sender/domain in Resend for production.
- You can test with `onboarding@resend.dev` while setting up in development.
- API route used by the form: `/api/request-quote`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
