
function Data() {

const margin = { top: 10, right: 30, bottom: 30, left: 60};
const width = 460; - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select(".globe-data")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// console.log(width)
// console.log(height)
// let i = 0

async function buildData () {
    let data = await d3.csv("./src/data/A1F1_2020.csv");
    createData(data)
}

buildData()

function createData (data) {

    const x = d3.scaleLinear()
        .domain([0, 167])
        .range([0, width]);
    
    svg.append("g")
        .attr("transform", "translate(0, " + height + ')')
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([-10, 10])
        .range([height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y));
    
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.Country);} )
            .attr("cy", function (d) { return y(d.Change);} )
            .attr("r", 5)
            .style("fill", "#69b3a2")
            .style("stroke", "white");


}

}

module.exports = Data;
