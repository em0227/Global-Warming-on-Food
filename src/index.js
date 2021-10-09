const Globe = require('./scripts/globe')


document.addEventListener("DOMContentLoaded", async function () {
    const world = await fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(res => res.json())
    const result = topojson.feature(world, world.objects.countries);

    new Globe(result)

})