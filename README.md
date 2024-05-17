## Enhanced auth with next, auth.js and mongo.

## 1. Introduction

Why? Because I needed, and you probably too. It uses mongoadapter for the auth database, it is simple, and meets most
of the requirements:

- User role
- Client & server
- configurable users models
- Socials / Account linking.

dependecies / libraries: Resend, shadcn, tailwind, auth.js

# 2. Features:

- custom user models, sessions, JWT and accounts.
- Can link multiple account, automically and manually, via socials, even with different emails.
- updating session
- protected routes
- 2FA
- Mail verification

# 3. Socials?

As any platform nowadays, socials signup / link is available. Currently only twitter as examples but can be extended depending on your needs.
For [Twitter](https://twitter.com/) you must have a `terms of service` and a `privacy policy` page available, in order to request users' emails.

# 4. Account linking

Account linking can be done automically - if a user has already signed up with an account, and then logs in via social having the same email; or manually - at the `/settings/accounts` page a user can log in via multiple socials in order to add those accounts to his user. This procedure needs some sort of attention, as unwanted things could happen. Multiple cases scenarios are treated and can be seen in the `auth.ts` file.

# 5. Files and brief description

- the `auth.ts` file contains big part of the authentication system. It contains callbacks, session modifiers, user & account models and authorization via `credentials`. Together with `auth.config.ts`, it represents the whole authentication system.
- `routes.ts` file will tell the application which routes should be protected. There are 2 routes defined: `public` and `auth routes`, the rest are automically protected by middleware
- `/actions` - folder that contains actions needed for the auth actions like
  login (via credentials), register, setting up a new password, and more. each
  action has its own file.

- `/data` - folder containing server-run actions for CRUD operations related to database data, such as users informations.
- `/hooks` - hook for client session
- `/lib` - contains utils functions for different things, such as server session, mail senders, tokens.

# 6. How to run locally / deploy

# Nextjs documentation:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Install the dependecies:

```bash
npm install
```

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Regarding our application:

# In order to run the application to the fullest you have to keep in mind:

1. You must set up a mongodb connection
2. Go and get keys for [twitter](https://developer.twitter.com) and [google](https://developers.google.com/)
   - if you need users emails, you will need a policy and a terms page available on your website.
3. Register to [Resend](resend.com) in order to be able to send mails.
   - Note: as you register you can only send emails
     to yourself; in order to send emails to any address, you
     have to register & verify a domain.
4. Replace `.env` variables:

```
NEXTAUTH_URL
NEXTAUTH_URL_INTERNAL
NEXTAUTH_SECRET

MONGODB_URI

AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET

RESEND_API_KEY
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
```

5. Good to go, enjoy your auth.
