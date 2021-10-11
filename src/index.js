const Globe = require('./scripts/globe')
const GlobeInteraction = require('./scripts/globe_interaction')


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

})