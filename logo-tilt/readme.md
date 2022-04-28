# Logo tilt

I wanted to try out a goofy idea. I wanted to animate a website’s logo so
that it would fall over when you scroll down, and right itself when you
scroll up. In particular, I wanted the logo to be a head or have a
cartoonish look.

<img
		src="img/demo.gif"
		alt="demo of logo tilt"
		width="638"
		height="604"
/>

I discuss the code behind it in my post, [How to detect scroll direction in vanilla JavaScript (to make a goofy logo animation)](https://www.roboleary.net/frontend/2022/04/13/detect-scroll-direction-vanilla-javascript.html).

This idea could be used to tilt individual page items as you scroll to give a uncanny sense of movement, kind of like you are moving the wall on which things hang. The IntersectionObserver API would be more suitable in the case of working with page items.

To see it in action:
- You can check out the [codepen](https://codepen.io/robjoeol/full/LYeQRwq), or
- You can run the local dev server with `npm run dev`, and find it at <http://localhost:3000/logo-tilt/index.html>.
