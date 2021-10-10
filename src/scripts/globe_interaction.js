const Globe = require('./globe')

function GlobeInteraction(globe) {
    const svg = d3.select(".globe")
        .append("svg")
        .attr("class", "globe-map")
        .attr("viewBox", "0 0 1500 1500");

    const g = svg.append("g")
        .attr("class", "countries");
    
    g.selectAll("path")
        .data(globe.result.features)
        .enter()
        .append("path")
        .attr('class', "country")
        .attr("d", d3.geoPath(globe.projection))
    
    // globe.addEventListener("mouseover", e => {
    //     const name = e.target.__data__.properties.name;
    //     e.attr("title", name);

    // })
}

module.exports = GlobeInteraction;