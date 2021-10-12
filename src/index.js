const Globe = require('./scripts/globe')
const Data = require("./scripts/data")


document.addEventListener("DOMContentLoaded", async function () {
    const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(res => res.json())
    const result = topojson.feature(world, world.objects.countries);
    console.log(result)
    const globe = new Globe(result)

    const globeMap = document.querySelector(".countries")

    globeMap.addEventListener("mouseover", e => {
        clearInterval(globe.setIntervalId);
    })

    globeMap.addEventListener("mouseout", e => {
        globe.rotate();
    })

    globeMap.addEventListener("click", e => {
        const countryBox = document.querySelector(".country-container");
        countryBox.style.display = "block";
    })

    const scatterBoxData = new Data();

    const cropBox = document.querySelector(".crop-buttons");
    let cropVal = "WH";

    const slider = document.querySelector("#scenario-slider-input");
    let sliderVal = "A1F";


    cropBox.addEventListener("click", e => {
        switch (e.target.innerHTML) {
        case "Wheat":
            cropVal = "WH";
            break;
        case "Rice":
            cropVal = "RI";
            break;
        case "Maize":
            cropVal = "MZ";
            break;
        }

        scatterBoxData.changeData(cropVal, sliderVal)
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}  ${sliderVal}`
    })

    slider.addEventListener("change", e => {
    
        switch (e.target.value) {
            case "1":
                sliderVal = "A1F";
                break;
            case "2":
                sliderVal = "A2";
                break;
            case "3":
                sliderVal = "B1";
                break;
            case "4":
                sliderVal = "B2";
                break;
        }

        scatterBoxData.changeData(cropVal, sliderVal)
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}  ${sliderVal}`
    } )

    
})


