
function Data(globe) {
    this.margin = { top: 10, right: 0, bottom: 35, left: 60 };
    this.width = 480 - this.margin.left;
    this.height = 300 - this.margin.top;

    this.svg = d3.select(".display-scatterplot-data")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 500 400")
        .append('g')
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    
    this.x = d3.scaleLinear()
        .domain([0, 167]) //could pass in variable
        .range([0, this.width]);
    
    this.y = d3.scaleLinear()
        .domain([-30, 20]) //could pass in variable
        .range([this.height, 0]);
    

    this.dotInfoG = this.svg
        .append("g")
        .attr("transform", `translate(0, ${this.height})`)
        .attr("class", "dot-info");

    this.globe = globe;

}

Data.prototype.draw = async function () {
    await this.createDefault(this.x, this.y);
    document.querySelector(".display-data-title h3").innerHTML = `WH  A1F`;

    this.buildDotInfo("limegreen", 0, 2020);
    this.buildDotInfo("deepskyblue", 45, 2050);
    this.buildDotInfo("mediumvioletred", 90, 2080);

}

Data.prototype.createDefault = function(x, y) {

    this.svg.append("g")
        .attr("transform", `translate(0, ${this.height})`)
        .call(d3.axisBottom(x));

    this.svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "start")
        .text("Countries Index") //could be changed to a variable to apply to other data visualization
        .attr("transform", `translate(${this.width / 3}, ${this.height + this.margin.bottom})`)

    this.svg.append("g")
        .call(d3.axisLeft(y));

    this.svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .text("Yield Change in %") //could be changed to a variable to apply to other data visualization
        .attr("transform", `translate(-${this.margin.bottom}, ${this.height / 3}) rotate(-90)`)
    
    this.buildDefaultData()
}

Data.prototype.buildDefaultData = async function () {
    let data = await d3.csv("./src/data/crops-yield-changes.csv");
    this.fillScatterPlotCircle(data, this.x, this.y, "limegreen", "WHA1F2020")
    this.fillScatterPlotCircle(data, this.x, this.y, "deepskyblue", "WHA1F2050")
    this.fillScatterPlotCircle(data, this.x, this.y, "mediumvioletred", "WHA1F2080")
}

Data.prototype.fillScatterPlotCircle = function (data, x, y, circleColor, yColumn) {
    
    this.svg.append("g")
        .attr("class", circleColor)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.Country); })
        .attr("cy", function (d) { return y(d[yColumn]); })
        .attr("r", 5)
        .style("fill", circleColor)
        .style("stroke", "white");
    
}

Data.prototype.buildDotInfo = function (circleColor, dis, year) {
    this.dotInfoG
        .append("circle")
        .attr("class", `${year}`)
        .attr("r", 5)
        .attr("cx", 5)
        .attr("cy", 5)
        .style("fill", circleColor)
        .attr("transform", `translate(${300 + dis}, 40)`)
    
    this.dotInfoG
        .append("text")
        .attr("transform", `translate(${315 + dis}, 50)`)
        .style("font-size", "12")
        .text(`${year}`)
}


Data.prototype.changeScatterPlotCircle = function (data, x, y, circleColor, yColumn) {
    
    this.svg.select(`.${circleColor}`)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.Country); })
        .attr("cy", function (d) { return y(d[yColumn]); })
        .attr("r", 5)
        .style("fill", circleColor)
        .style("stroke", "white"); 
        
    //need to select the right circles under the right g element 
    
}

Data.prototype.changeData = async function (crop, scenario, year) {
    let data = await d3.csv("./src/data/crops-yield-changes.csv");
    this.changeScatterPlotCircle(data, this.x, this.y, "limegreen", `${crop}${scenario}2020`)
    this.changeScatterPlotCircle(data, this.x, this.y, "deepskyblue", `${crop}${scenario}2050`)
    this.changeScatterPlotCircle(data, this.x, this.y, "mediumvioletred", `${crop}${scenario}2080`)

}



module.exports = Data;
