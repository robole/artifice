let rowCount = getComputedStyle(document.documentElement).getPropertyValue(
  "--rows"
);

function getColumns() {
  let leftSide = getLeftSide();
  let rightSide = getRightSide();
  return leftSide.concat(rightSide);
}

function getLeftSide() {
  let leftSide = [];

  for (let i = 0; i < rowCount; i++) {
    let col = [];
    let el = document.querySelector(`.disk:nth-of-type(${i + 1})`);
    col.push(el);

    let factor = 1;
    for (let j = i; j > 0; j--) {
      let index = rowCount * j + factor;
      let el = document.querySelector(`.disk:nth-of-type(${index})`);
      col.push(el);
      factor++;
    }

    leftSide.push(col);
  }

  return leftSide;
}

function getRightSide() {
  let rightSide = [];

  for (let i = 1; i < rowCount; i++) {
    let col = [];
    let index = rowCount * (i + 1);
    let el = document.querySelector(`.disk:nth-of-type(${index})`);
    col.push(el);

    let factor = 1;
    for (let j = i + 1; j < rowCount; j++) {
      let index = j * rowCount + (rowCount - factor);
      let el = document.querySelector(`.disk:nth-of-type(${index})`);
      col.push(el);
      factor++;
    }

    rightSide.push(col);
  }

  return rightSide;
}

function animate() {
  let cols = getColumns();
  const tl = new TimelineMax({});
  const tl2 = new TimelineMax({});
  const tl3 = new TimelineMax({});
  let speed = 0.4;

  for (let j = 0; j < cols.length; j++) {
    tl.to(cols[j], speed, { opacity: 0.66, ease: "power3.easeInOut" });
    tl2.to(cols[j], speed, {
      opacity: 0.33,
      delay: 0.25,
      ease: "power3.easeInOut",
    });
    tl3.to(cols[j], speed, {
      opacity: 0,
      delay: 0.35,
      ease: "power3.easeInOut",
    });
  }
}

animate();
