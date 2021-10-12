
function Data() {
    this.margin = { top: 10, right: 30, bottom: 35, left: 60 };
    this.width = 600 - this.margin.left;
    this.height = 400 - this.margin.top;

    this.svg = d3.select(".display-data")
        .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    
    this.x = d3.scaleLinear()
        .domain([0, 167]) //could pass in variable
        .range([0, this.width]);
    
    this.y = d3.scaleLinear()
        .domain([-25, 20]) //could pass in variable
        .range([this.height, 0]);

    this.createAxis()
    this.buildData("WH", "A1F")
    

}

Data.prototype.createAxis = function() {

    this.svg.append("g")
        .attr("transform", `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x));

    this.svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "start")
        .text("Countries Index") //could be changed to a variable to apply to other data visualization
        .attr("transform", `translate(${this.width / 3}, ${this.height + this.margin.bottom})`)


    this.svg.append("g")
        .call(d3.axisLeft(this.y));

    this.svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .text("Yield Change in %") //could be changed to a variable to apply to other data visualization
        .attr("transform", `translate(-${this.margin.bottom}, ${this.height / 3}) rotate(-90)`)
}


Data.prototype.fillScatterPotCircle = function (data, x, y, circleColor, yColumn) {
    
    this.svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.Country);} )
            .attr("cy", function (d) { return y(d[yColumn]);} )
            .attr("r", 5)
            .style("fill", circleColor)
            .style("stroke", "white");
}

Data.prototype.buildData = async function (crop, scenario) {
    let data = await d3.csv("./src/data/crops-yield-changes.csv");
    this.fillScatterPotCircle(data, this.x, this.y, "#69b3a2", `${crop}${scenario}2020`)
    this.fillScatterPotCircle(data, this.x, this.y, "blue", `${crop}${scenario}2050`)
    this.fillScatterPotCircle(data, this.x, this.y, "red", `${crop}${scenario}2080`)
}

module.exports = Data;
