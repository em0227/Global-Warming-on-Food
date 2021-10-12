
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
        .domain([-30, 30]) //could pass in variable
        .range([this.height, 0]);

    this.dotInfoSvg = d3.select(".dot-color-info")
        .append("svg")
        .attr("height", 15)
        .attr("width", 600)
    
    this.createDefault(this.x, this.y);
    document.querySelector(".display-data-title h3").innerHTML = `Wheat  A1F`
    this.buildDotInfo("limegreen", 0, 2020);
    this.buildDotInfo("deepskyblue", 55, 2050);
    this.buildDotInfo("mediumvioletred", 110, 2080);

    this.renderSlider()
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
    this.dotInfoSvg
        .append("circle")
        .attr("class", `${year}`)
        .attr("r", 5)
        .attr("cx", 5)
        .attr("cy", 5)
        .style("fill", circleColor)
        .attr("transform", `translate(${400 + dis}, 0)`)
    
    this.dotInfoSvg
        .append("text")
        .attr("transform", `translate(${415 + dis}, 12)`)
        .attr("color", "black")
        .text(`${year}`)
}

Data.prototype.renderSlider = function () {
    const slider = document.querySelector(".scenario-slider");

    const sliderInput = document.createElement("input");
    sliderInput.setAttribute("id", "scenario-slider-input");
    sliderInput.setAttribute("type", "range");
    sliderInput.setAttribute("min", 1);
    sliderInput.setAttribute("max", 4);
    sliderInput.setAttribute("step", 1);
    sliderInput.setAttribute("value", 1);
    sliderInput.setAttribute("style", "width: 90%");

    slider.appendChild(sliderInput);
    
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

Data.prototype.changeData = async function (crop, scenario) {
    let data = await d3.csv("./src/data/crops-yield-changes.csv");
    this.changeScatterPlotCircle(data, this.x, this.y, "limegreen", `${crop}${scenario}2020`)
    this.changeScatterPlotCircle(data, this.x, this.y, "deepskyblue", `${crop}${scenario}2050`)
    this.changeScatterPlotCircle(data, this.x, this.y, "mediumvioletred", `${crop}${scenario}2080`)
}


module.exports = Data;
