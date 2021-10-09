const Globe = require('./scripts/globe')


document.addEventListener("DOMContentLoaded", async function () {
    const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(res => res.json())
    const result = topojson.feature(world, world.objects.countries);
    
    new Globe(result)

})