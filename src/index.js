const Globe = require('./scripts/globe')
const Data = require("./scripts/data")


document.addEventListener("DOMContentLoaded", function () {
    
    new Globe()

    
    

    

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

        scatterBoxData.changeData(cropVal, sliderVal);
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}  ${sliderVal}`;
    })

    slider.addEventListener("change", e => {
    
        switch (e.target.value) {
            case "1":
                sliderVal = "A1F";
                break;
            case "2":
                sliderVal = "A2a";
                break;
            case "3":
                sliderVal = "B1a";
                break;
            case "4":
                sliderVal = "B2a";
                break;
        }

        scatterBoxData.changeData(cropVal, sliderVal);
        document.querySelector(".display-data-title h3").innerHTML = `${cropVal}  ${sliderVal}`;
    } )

    
})


