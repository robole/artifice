# They See Me Rollin

I wanted to create something kitsch for the opening lines of Chamillionaires' song *Ridin Dirty*.

A 3D animation came to mind with the text rolling - revolving like a roller from a steam roller.

This is what I came up with.

![screenshot](img/screenshot.gif)

To see it in action:
- You can check out the [codepen](https://codepen.io/robjoeol/pen/ZEpEKOb), or
- You can run the local dev server with `npm run dev`, and find it at <http://localhost:3000/they-see-me-rollin/index.html>.

## Discoveries

It is not necessary to add `will-change:transform` to `.roller`. By default, the rollers are promoted to separate layers. This runs at a steady 60fps. Woo!

## Initial issues

It didn't look right in Firefox initially. It may been a bug with an earlier version of GSAP, but it appears to work fine with GSAP v3.5.

## Attribution

- Photo by [Karsten Winegeart](https://unsplash.com/@karsten116?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on Unsplash.
