# Shiny book reveal

3D hover effect to open a book and reveal the synopsis of the book. I wanted to try out using realistic reflections. You can see the light "reflect" off the cover as it opens.

<img src="img/demo.gif" alt="demo of hover effect" width="470" height="552"/>

To see it action:
- You can check out the [codepen](https://codepen.io/robjoeol/full/WmgVvx), or
- Run the local dev server (`npm run dev`) and find it at <http://localhost:3000/shiny-book-reveal/index.html>.

## Surface reflection

I tried out putting a reflection underneath  to give the appearance of a glossy surface. This can be done with [`-webkit-box-reflect`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-box-reflect), which is a non-standard property but has support in all major browsers except Firefox. However, I removed it as it doesn't work in a realistic way with the hover effect.
