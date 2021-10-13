const Globe = require('./scripts/globe')
const Data = require("./scripts/data")


document.addEventListener("DOMContentLoaded", function () {
    
    const globe = new Globe()
    globe.draw();
    //need to fix the tooltip positions

    const globeData = new Data();
    globeData.draw();


    
})


