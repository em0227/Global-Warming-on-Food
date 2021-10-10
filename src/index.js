const Globe = require('./scripts/globe')
const GlobeInteraction = require('./scripts/globe_interaction')


document.addEventListener("DOMContentLoaded", async function () {
    const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(res => res.json())
    const result = topojson.feature(world, world.objects.countries);
    console.log(result)
    const globe = new Globe(result)
    new GlobeInteraction(globe)

})