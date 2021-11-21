# Orange you thirsty?

Whimsical take on a product card for orange juice. On hover, it reveals the product with an animation.

![demo](img/screenshots/demo.gif)

It is a CSS-only hover effect, which is actually 2 separate animations:
1. The first animation spins around the top layer, which has the picture of an orange slice, and it fades the opacity to 0.
1. As the top layer fades, if the mouse is still hovering over the element, it will trigger the animation of the layer underneath, which raises the picture of the girl showing off her orange juice.

To see it in action:
- You can check out the [codepen](https://codepen.io/robjoeol/full/jObydPw), or
- You can run the local dev server with `npm run dev`, and find it at <http://localhost:3000/orange-you-thirsty/index.html>.
