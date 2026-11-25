# sh-links

Saint Helen's link-in-bio page (replaces linktr.ee/sainthelen). Live at links.sainthelen.org, Vercel project `sh-links` on the Adventii Media team.

## Content lives in one file
`data/links.json`. Nothing else should need to change for a normal update.

- `featured[]`: the "Coming up" list. `{ id, title, url, label?, note?, start?, end? }`. `label` is the small line above the title (a date, or an action like "Register by Monday, November 30").
- `posts[]`: photo grid that mirrors Instagram posts. `{ id, title, url, image, alt?, postedAt, bufferId?, start?, end? }`. Put a 480x600 JPG in `public/posts/YYYY-MM-DD-slug.jpg` (resize the 1080x1350 post image, quality ~78) and use `/posts/...` as `image`. Newest first, 12 max.
- `sections[]`: evergreen groups of links.

## Dates do the cleanup
`start` and `end` are ISO times with the Eastern offset (`-05:00` in winter, `-04:00` in summer). Anything outside its window is hidden at render time, and the page re-renders at least hourly (`revalidate = 3600`), so dated items fall off on their own without a deploy. Every dated item needs an `end`: the event start for events, the deadline for registrations.

## Rules
- Only link to pages that are live. curl every new URL first and use the final URL after redirects.
- Copy follows the Saint Helen voice: plain, warm, logistics first. "Saint Helen", never "St. Helen's". No em dashes.
- Links to sainthelen.org get UTM tags automatically in `lib/links.ts`; do not add them by hand.
- Design is set (navy #1F346D, rust #CD5334, cream #FAF9F7, Libre Baskerville + Libre Franklin). Do not restyle without Matthew asking. Check any visual change in a browser at 390px wide.

## Deploying
Push to `main`. If the Vercel project is not yet linked to this repo, deploy through the Vercel connector (`create_deployment` with gitSource github matthewboylenow/sh-links, ref main, target production).
