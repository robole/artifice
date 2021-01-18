const gui = new dat.GUI({ name: "My GUI" });
const content = document.getElementsByClassName("content")[0];
const scene = document.getElementById("scene");

const config = {
  size: 200,
};

gui
  .add(config, "size", 20, 1920, 10)
  .name("Size")
  .onChange((newValue) => {
    content.style.width = `${newValue}px`;
    content.style.height = `${newValue}px`;
  });
