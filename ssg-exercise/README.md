# HW5 Part 4 (Astro exercise)

For this part, I used my home and about pages from my portfolio. Both pages use the same footer, so I only have to edit it in one place.

## Where stuff is
- `src/pages/index.astro` is the home page
- `src/pages/about.astro` is the about page
- `src/layouts/BaseLayout.astro` is the head, header/nav, and main wrapper that both pages use
- `src/components/Footer.astro` is the shared footer
- `public/` is just my css, images, and theme toggle js copied over

## How to run it
need node 22.23.4 or newer. then run these inside the `ssg-exercise` folder

```bash
npm install
npm run build
npm run preview
```

then open the link it gives you:
- homepage: http://localhost:port#/
- about page: http://localhost:port#/about/

## Testing the shared footer
change something in `src/components/Footer.astro`, run `npm run build` and `npm run preview` again, and refresh both pages. the change shows up on both.

## Notes
- only home and about pages are in here, so links to my other pages won't go anywhere in this exercise.
- I set `compressHTML: false` in `astro.config.mjs` because the build was squishing words together (like "I'malways")