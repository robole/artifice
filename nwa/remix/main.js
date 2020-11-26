const animationDuration = 3;

const volume = document.querySelector("input");
volume.addEventListener("click", toggleMute);

const poster = document.getElementsByClassName("poster")[0];
poster.style.willChange = "transform, opacity"; // improves perf
poster.addEventListener("click", replay);

let siren = new Audio(
  "https://github.com/robole/artifice/raw/master/nwa/remix/siren.mp3"
);
// let siren = new Audio("siren.mp3");
siren.muted = true;

let tween1 = gsap.to(".poster", { z: 0, duration: animationDuration });
let tween2 = gsap.to(".content", {
  rotationY: "1800",
  duration: animationDuration,
  onStart: playSiren,
  onComplete: stopSiren,
});
let tween3 = gsap.to(".shadow", {
  opacity: 1,
  duration: 0.25,
  yoyo: true,
  repeat: -1,
});
let tween4 = gsap.to(".poster", {
  opacity: 0.75,
  duration: 0.3,
  repeat: -1,
});

function toggleMute() {
  siren.muted = !siren.muted;

  if (tween2.isActive()) {
    playSiren();
  }
}

function stopSiren() {
  siren.pause();
}

function playSiren() {
  siren.currentTime = 0;
  siren.play();
}

function replay() {
  siren.currentTime = 0;
  tween1.restart();
  tween2.restart();
  tween3.restart();
}
