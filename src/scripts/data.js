
function Data() {

const margin = { top: 10, right: 30, bottom: 35, left: 60};
const width = 600 - margin.left;
const height = 400 - margin.top;

const svg = d3.select(".wheat")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


async function buildData () {
    let data = await d3.csv("./src/data/crops-yield-changes.csv");
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
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "start")
        .text("Countries Index")
        .attr("transform", "translate(" + width / 3 + "," + (height + margin.bottom) +")")

    const y = d3.scaleLinear()
        .domain([-25, 20])
        .range([height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .text("Yield Change in %")
        .attr("transform", "translate(-30, " + height/3 + ") rotate(-90)")
    
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.Country);} )
            .attr("cy", function (d) { return y(d.WHA1F2020);} )
            .attr("r", 5)
            .style("fill", "#69b3a2")
            .style("stroke", "white");

    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Country); })
        .attr("cy", function (d) { return y(d.WHA1F2050); })
        .attr("r", 5)
        .style("fill", "scarlet")
        .style("stroke", "white");

    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Country); })
        .attr("cy", function (d) { return y(d.WHA1F2080); })
        .attr("r", 5)
        .style("fill", "red")
        .style("stroke", "white");


}

}

module.exports = Data;
