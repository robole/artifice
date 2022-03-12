let name1 = d3.select("#name1");
let name2 = d3.select("#name2");
let pen = d3.select("#pen");

initPath(name1); // set the stroke properties
initPath(name2);

setTimeout(showAutograph, 3000);
setTimeout(() => {
  pen.style("visibility", "hidden");
}, 7000);

// make it one big long stroke dash
function initPath(path) {
  let lineLen = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", `${lineLen}, ${lineLen}`)
    .attr("stroke-dashoffset", lineLen);
}

function showAutograph() {
  illustratePath(name1, 2000, 0);
  illustratePen(name1, 2000, 0);

  illustratePath(name2, 2000, 2000);
  illustratePen(name2, 2000, 2000);
}

// illustrate the stroke of the path from zero to end
function illustratePath(path, duration, delay) {
  path
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("stroke-dashoffset", 0);
}

// illustrate the stroke of the path from zero to end
function illustratePen(pathToFollow, duration, delay) {
  pen.style("opacity", 1);

  pen
    .transition()
    .duration(duration)
    .delay(delay)
    .attrTween("transform", translateAlong(pathToFollow.node()));
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
  let l = path.getTotalLength();
  return function (d, i, a) {
    return function (t) {
      let p = path.getPointAtLength(t * l);
      return `translate(${p.x},${p.y})`;
    };
  };
}
