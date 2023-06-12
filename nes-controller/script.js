import * as dat from "dat.gui";

let controller = document.querySelector("#controller");
let everything = controller.querySelectorAll("*");

const gui = new dat.GUI({});
const config = {
  shadows: true,
};

gui
  .add(config, "shadows")
  .name("Shadows")
  .onChange(() => {
    updateShadows();
  });

function updateShadows() {
  controller.classList.toggle("noShadows");

  everything.forEach((element) => {
    element.classList.toggle("noShadows");
  });
}
