import "./style.css";

let logo = document.querySelector(".logo");
let previousScrollPosition = 0;

const isScrollingDown = () => {
  let goingDown = false;

  let scrollPosition = window.pageYOffset;

  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }

  previousScrollPosition = scrollPosition;

  return goingDown;
};

const handleScroll = () => {
  if (isScrollingDown()) {
    logo.classList.add("scroll-down");
    logo.classList.remove("scroll-up");
  } else {
    logo.classList.add("scroll-up");
    logo.classList.remove("scroll-down");
  }
};

const scrollThrottle = _.throttle(handleScroll, 100);
window.addEventListener("scroll", scrollThrottle);
