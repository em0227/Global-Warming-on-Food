const Globe = require("./scripts/globe");
const Data = require("./scripts/data");
const ControlEvents = require("./scripts/control_panel");
const { Modal } = require("./scripts/modal");

document.addEventListener("DOMContentLoaded", function () {
  Modal();

  const globe = new Globe();
  globe.draw();
  //need to fix the tooltip positions

  const globeData = new Data();
  globeData.draw();

  const controlPanel = new ControlEvents(globe, globeData);
  controlPanel.update();
});
