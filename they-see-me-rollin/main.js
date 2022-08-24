import gsap from "gsap";

gsap.set(".roller", {
  transformOrigin: "100% center",
});

gsap.to(".rollin", 4, {
  rotationX: "360",
  repeat: -1,
  ease: "linear",
});

gsap.to(".hatin", 6, {
  rotationX: "-360",
  repeat: -1,
  ease: "linear",
});
