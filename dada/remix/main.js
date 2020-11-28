let vertical = document.querySelector(".vertical");
let horizontal = document.querySelector(".horizontal");
let canvas = document.getElementsByClassName("canvas")[0];

const tl = new TimelineMax();

tl.set(vertical, {
  transformOrigin: "center center -100px",
  backfaceVisibility: "hidden",
  rotationY: "180",
  opacity: 1,
});

tl.set(horizontal, {
  transformOrigin: "center center -100px",
  backfaceVisibility: "hidden",
  rotationX: "180",
  opacity: 1,
});

tl.to(vertical, 1.5, {
  rotationY: "0",
});

tl.to(horizontal, 1.5, {
  rotationX: "0",
});

canvas.addEventListener("click", () => {
  tl.restart();
});
