let tl1 = new TimelineMax();

tl1.set(".diamond", { transformOrigin: "center", scale: 0 });

tl1.to("#diamondUse", {
  duration: 0.1,
  opacity: 1,
});
tl1.to(".credits", {
  duration: 0.1,
  opacity: 1,
});
tl1.to(".diamond", {
  duration: 2,
  scale: 4,
  ease: "power2.in",
});

tl1.to("#credit-name", {
  delay: 0.5,
  duration: 0.3,
  opacity: 0,
  repeatDelay: 1,
  repeat: 3,
  yoyo: true,
  ease: "power2.in",
});

// tl1.to("#title", {
//   duration: 0.2,
//   filter: "blur(0)",
//   ease: "power2.in",
// });

let svg = document.getElementsByTagName("svg")[0];

svg.addEventListener("click", replay);

function replay() {
  tl1.restart();
}
