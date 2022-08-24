import gsap from "gsap";

// CSSRulePlugin is not required to be explicitly declared

let x = "blah";
let y = x * 2;

const tl = new gsap.timeline();
const pauseBetween = 1;
const textRevealDelay = 0.5;
const mainSvg = document.getElementById("sinCity");
mainSvg.addEventListener("click", replay);

let gun = document.getElementById("gun");
let victim = document.getElementById("victim");
let grave = document.getElementById("grave");

let overflowing = isOverflowing();

gsap.set(".bigText1", { scale: 1, transformOrigin: "50% 50%" });
gsap.set("#gun", { xPercent: -10 });
gsap.set("#shell", { transformOrigin: "50% 50%" });
gsap.set("#victim", { x: -5, y: -1, transformOrigin: "50% 50%" });
gsap.set("#brains", { x: -15, scale: 0.9 });
gsap.set("#grave", { scale: 1.2, transformOrigin: "50% 50%" });
gsap.set("#raisedGun", { rotation: 6, transformOrigin: "50% 100%" });

tl.to("#sinCity", 0.01, {
  opacity: 1,
});
tl.to(".bigText1", 0.3, {
  scale: 0,
  delay: pauseBetween,
  onStart: () => {
    document.getElementById("blam1").scrollIntoView(true);
  },
});
tl.to("#gun", 0.1, { opacity: 1, delay: pauseBetween });
tl.to("#gun", 0.2, {
  xPercent: 0,
  ease: "power3.easeInOut",
});
tl.to("#triggerFinger", 0.05, {
  x: -5,
  ease: "power3.easeInOut",
  repeat: 1,
  yoyo: true,
});
tl.to("#blam1", 0.05, {
  opacity: 1,
});
tl.to("#gun", 0.05, {
  rotation: -1,
  ease: "power3.easeInOut",
  repeat: 1,
  yoyo: true,
  onComplete: addGunMask,
});
tl.to("#shell", 0.01, {
  opacity: 1,
});
tl.to("#shell", 0.05, {
  y: -40,
  x: -15,
  ease: "power4.elastic",
});
tl.to(".text1", 0.1, {
  opacity: 1,
  delay: textRevealDelay,
});
tl.to(".bigText2", 0.01, {
  opacity: 1,
  delay: pauseBetween,
  onStart: () => {
    document.getElementById("blam2").scrollIntoView(true);
  },
});
tl.to(".bigText2", 0.3, {
  scale: 0,
  delay: textRevealDelay,
  transformOrigin: "50% 50%",
});
tl.to("#victim", 0.2, {
  opacity: 1,
});
tl.to("#victim", 0.2, {
  x: 0,
  y: 0,
});
tl.to(".box2", 0.1, {
  onStart: addVictimMask,
  opacity: 1,
});
tl.to("#skull", 0.2, {
  x: 3,
  opacity: 0,
});
tl.to("#brains", 0.2, {
  x: 0,
  opacity: 1,
  scale: 1,
  ease: "power4.elastic",
});
tl.to(".text2", 0.1, {
  opacity: 1,
  delay: textRevealDelay,
});
tl.to(".bigText3", 0.01, {
  opacity: 1,
  delay: pauseBetween,
  onStart: () => {
    document.getElementById("blam3").scrollIntoView(true);
  },
});
tl.to(".bigText3", 0.3, {
  scale: 0,
  delay: textRevealDelay,
  transformOrigin: "50% 50%",
});
tl.to("#grave", 0.01, {
  opacity: 1,
  delay: 0.1,
});
tl.to("#grave", 0.75, {
  scale: 1,
});
tl.to(".box3", 0.01, {
  opacity: 1,
  onComplete: addGraveMask,
});
tl.to("#grave", 0.1, {
  fill: "#ffffff",
});
tl.to(".text3", 0.3, {
  opacity: 1,
  delay: textRevealDelay,
});
tl.to(".box4", 0.01, {
  opacity: 1,
  delay: pauseBetween,
  onStart: () => {
    document.getElementById("blam4").scrollIntoView(true);
  },
});
tl.to("#raisedGun", 1, {
  rotation: 0,
  x: 0,
});
tl.to("#chin", 0.2, {
  y: -2,
  delay: 0.1,
});
tl.to(".text4", 0.01, {
  opacity: 1,
  delay: 0.2,
});
tl.to("#chin", 0.2, {
  y: 2,
});

function isOverflowing() {
  return (
    document.documentElement.scrollHeight >
    document.documentElement.clientHeight
  );
}

function addGunMask() {
  gun.setAttribute("mask", "url(#blam1Mask)");
}

function removeGunMask() {
  gun.setAttribute("mask", "");
}

function addVictimMask() {
  victim.setAttribute("mask", "url(#blam2Mask)");
}

function removeVictimMask() {
  victim.setAttribute("mask", "");
}

function addGraveMask() {
  grave.setAttribute("mask", "url(#blam3Mask)");
}

function removeGraveMask() {
  grave.setAttribute("mask", "");
}

function resetMasks() {
  removeGunMask();
  removeVictimMask();
  removeGraveMask();
}

function replay() {
  const main = document.getElementsByTagName("main")[0];

  // jump to top immediately without smooth scrolling
  main.classList.remove("smooth");
  document.getElementById("blam1").scrollIntoView(true);
  setTimeout(() => {
    main.classList.add("smooth");
  }, 17);

  resetMasks();
  tl.restart();
}
