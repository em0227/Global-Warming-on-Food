const RenderObj = require("./render_obj");
const Globe = require("./globe");
const Data = require("./data");

function ControlEvents(globe, globeData) {
    this.globe = globe;
    this.globeData = globeData;

    RenderObj.renderScenariosSlider();
    RenderObj.renderYearsSlider();
    RenderObj.moreInfoToolTip();
}

ControlEvents.prototype.update = function () {


    const cropBox = document.querySelector(".crop-buttons");
    let cropVal = "WH";

    const scenarioSlider = document.querySelector("#scenario-slider-input");
    let scenarioSliderVal = "A1F";

    const yearSlider = document.querySelector("#year-slider-input");
    let yearSliderVal = "2020";

    cropBox.addEventListener("click", e => {
        switch (e.target.innerHTML) {
            case "Wheat":
                cropVal = "WH";
                document.querySelectorAll("button").forEach(el => el.style.borderColor = "white");
                e.target.style.borderColor = "gold";
                e.target.style.borderWidth = "2px" ;
                break;
            case "Rice":
                cropVal = "RI";
                document.querySelectorAll("button").forEach(el => el.style.borderColor = "white");
                e.target.style.borderColor = "gold";
                e.target.style.borderWidth = "2px";
                break;
            case "Maize":
                cropVal = "MZ";
                document.querySelectorAll("button").forEach(el => el.style.borderColor = "white");
                e.target.style.borderColor = "gold";
                e.target.style.borderWidth = "2px";
                break;
        }

        this.globeData.changeData(cropVal, scenarioSliderVal);
        this.globe.updateData(cropVal, scenarioSliderVal, yearSliderVal);
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}  ${scenarioSliderVal}`;
        document.querySelector(".globe-color-info-title").innerHTML = `${cropVal}  ${scenarioSliderVal}  ${yearSliderVal}`;
    })

    scenarioSlider.addEventListener("change", e => {

        switch (e.target.value) {
            case "1":
                scenarioSliderVal = "A1F";
                break;
            case "2":
                scenarioSliderVal = "A2a";
                break;
            case "3":
                scenarioSliderVal = "B1a";
                break;
            case "4":
                scenarioSliderVal = "B2a";
                break;
        }

        this.globeData.changeData(cropVal, scenarioSliderVal);
        this.globe.updateData(cropVal, scenarioSliderVal, yearSliderVal);
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}   ${scenarioSliderVal}`;
        document.querySelector(".globe-color-info-title").innerHTML = `${cropVal}  ${scenarioSliderVal}  ${yearSliderVal}`;
    });

    yearSlider.addEventListener("change", e => {

        switch (e.target.value) {
            case "1":
                yearSliderVal = "2020";
                break;
            case "2":
                yearSliderVal = "2050";
                break;
            case "3":
                yearSliderVal = "2080";
                break;
        }

        this.globe.updateData(cropVal, scenarioSliderVal, yearSliderVal);
        document.querySelector(".globe-color-info-title").innerHTML = `${cropVal}  ${scenarioSliderVal}  ${yearSliderVal}`;
    })
}

module.exports = ControlEvents;