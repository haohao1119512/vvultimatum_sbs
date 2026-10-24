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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Trailer cover images (must redo for every new game)

The homepage trailer cover (`TrailerCard` in `src/components/site.tsx`) is the mobile LCP element. It loads responsive WebPs, not the JPG directly:

- `public/images/hero-trailer-480.webp`
- `public/images/hero-trailer-768.webp`
- `public/images/hero-trailer-1280.webp`

Whenever you replace `public/images/hero-trailer-thumbnail.jpg` (1280×720) with the new game's cover, regenerate all three from it:

```bash
bash scripts/gen-trailer-webp.sh   # cwebp -q 78, widths 480/768/1280
```

If you skip this, phones and most browsers keep showing the old game's cover. These files are not in favicon_io; they come from the trailer thumbnail.
