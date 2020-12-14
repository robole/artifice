# They See Me Rollin

I wanted to create something kitsch for the opening lines of Chamillionaires' song *Ridin Dirty*. 

A 3D animation came to mind with the text rolling - revolving like a roller from a steam roller.

This is what I came up with.

![screenshot](img/screenshot.gif)

Check out the [live demo](https://codepen.io/robjoeol/pen/ZEpEKOb).

## Discoveries

It is not necessary to add `will-change:transform` to `.roller`. By default, the rollers are promoted to separate layers. This runs at a steady 60fps. Woo!

## Room for Improvement

There is a slight discrepancy that affects the rotation. It is almost imperceptible (you wouldn't notice it if I didn't mention it). I think the "roller" is not 100% symmetrical, it tilts down by a small fraction at the end of a revolution. I wasn't able to smooth this out 100%.

## Attribution

- Photo by [Karsten Winegeart](https://unsplash.com/@karsten116?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on Unsplash.
