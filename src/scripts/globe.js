
function Globe() {

    const radius = 400;
    this.axisDegree = 0
    this.rotationDegree = 0;
    this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);
    this.setIntervalId = 0;
    this.yieldColors = ["purple", "navy", "royalblue", "skyblue", "white", "yellow", "orange", "crimson"];
    this.yieldMarks = [20, 10, 5, 0, -5, -10, -15, -20];

    this.svg = d3.select(".globe")
        .append("svg")
        .attr("class", "globe-map")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "100 0 1000 1100");

    this.colorRecG = this.svg
        .append("g")
        .attr("class", "color-info")
        .attr("transform", `translate(0, 950)`);
    
    this.colorRecG
        .append("text")
        .style('font-size', "20px")
        .attr("class", "globe-color-info-title")
        .attr("transform", `translate(500, 0)`)
        .text("WH A1F 2020")
    
}

Globe.prototype.draw = async function () {
    const map = await this.grabMapData();
    const cropData = await d3.csv("./src/data/crops-yield-changes.csv");
    this.createGlobe(map, cropData);
    this.rotate();
    this.events();
}

Globe.prototype.grabMapData = async function () {
    const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(res => res.json())
    return topojson.feature(world, world.objects.countries);
    
}

Globe.prototype.createGlobe = function (map, cropData) {

    const g = this.svg.append("g")
        .attr("class", "countries")
        .style("position", "relative");


    const tooltip = d3.select(".globe")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute");

    const tipMouseover = function (d) {
        tooltip
            .style("opacity", 1)
            .html(this.id)
            .style("left", (this.pageX + 10) + "px")
            .style("top", (this.pageY - 50) + "px")
    }

    const tipMousemove = function (d) {
        tooltip
            .html(this.id)
            .style("left", (this.pageX + 10) + "px")
            .style("top", (this.pageY - 50) + "px")
    }

    const tipMouseleave = function (d) {
        tooltip.style("opacity", 0)

    }

    const globe = this;

    g.selectAll("path")
        .data(map.features)
        .enter()
        .append("path")
        .attr('class', "country rotate-false")
        .attr("id", d => {
            return d.properties.name;
        })
        .style("fill", function (d) {
            for (let i = 0; i < cropData.length; i++) {
                if (d.properties.name === cropData[i].CountryName) {
                    let val = cropData[i]['WHA1F2020'];
                    for (let j = 0; j < globe.yieldMarks.length; j++) {
                        if (val >= globe.yieldMarks[j]) {
                            return globe.yieldColors[j]
                        }
                    }
                }
            }
            return "gray"
        })
        .attr("d", d3.geoPath(this.projection))
        .on("mouseover", tipMouseover)
        .on("mousemove", tipMousemove)
        .on("mouseleave", tipMouseleave);

    const graticule = d3.geoGraticule();

    const g2 = this.svg.append("g")
        .attr("class", "graticule-outline");

    g2.selectAll("path")
        .data([graticule()])
        .enter()
        .append("path")
        .attr("class", "graticule")
        .attr("d", d3.geoPath(this.projection));
    

    let dis = 45
    this.colorInfo("gray", 10, "No Data")
    for (let i = 0; i < this.yieldColors.length; i++) {
        const color = this.yieldColors[i];
        const num = this.yieldMarks[i];
        dis += 70;
        this.colorInfo(color, dis, num);
    }
    
    
}

Globe.prototype.colorInfo = function (rectColor, dis, num) {
    
    colorRect = this.colorRecG
        .append("rect")
        .attr("class", `${num}`)
        .attr("height", 15)
        .attr("width", 15)
        .style("fill", rectColor)
        .style("stroke-width", 1)
        .style("stroke", 'gray')
        .attr("transform", `translate(${230 + dis}, 40)`);

    const condition = function (num) {
        if (num === "No Data") {
            return `${num}`;
        } else {
            return `${num}%`;
        }
    }
    
    this.colorRecG
        .append("text")
        .attr("transform", `translate(${250 + dis}, 55)`)
        .style("font-size", "16")
        .text(condition(num));

}


Globe.prototype.rotate = function() {
    const countries = document.getElementsByClassName("country");
    const globe = this;

    this.setIntervalId = setInterval(() => {      
        globe.changeRotationAngle();
        for (let i = 0; i < countries.length; i++) {
            const country = d3.select(countries[i]);
            country
                .attr("class", "country rotate-true")
                .attr("d", d3.geoPath(globe.projection.rotate([globe.rotationDegree, globe.axisDegree])))
        }
    }, 50);

}
        
Globe.prototype.changeRotationAngle = function() {
    this.rotationDegree += 1;
    if (this.rotationDegree === 360) this.rotationDegree = 0;
}

Globe.prototype.events = function () {
    const globeMap = document.querySelector(".countries");

    globeMap.addEventListener("mouseover", e => {
        clearInterval(this.setIntervalId);
    })

    globeMap.addEventListener("mouseout", e => {
        this.rotate();
    })

    globeMap.addEventListener("click", e => {
        const countryBox = document.querySelector(".country-container");
        countryBox.style.display = "block";

        const countries = d3.selectAll(".country");

        // console.log(countries);
        console.log(countries.attr("class"))
        // console.log(countries[0].dataset.rotateState)
        
        if (countries.attr("class") === "country rotate-true") {
            countries.each((d, i) => d3.select(countries[i]).attr("class", "country rotate-false"));
            clearInterval(this.setIntervalId);
        } else {
            this.rotate();
        }
        
    });

}

Globe.prototype.updateData = async function (crop, scenario, year) {
    const g = d3.select(".countries");
    const globe = this;
    const cropData = await d3.csv("./src/data/crops-yield-changes.csv");

    g.selectAll(".country")
        .style("fill", function (d) {
            for (let i = 0; i < cropData.length; i++) {
                //could use find
                if (this.id === cropData[i].CountryName) {
                    let val = cropData[i][`${crop}${scenario}${year}`];
                    for (let j = 0; j < globe.yieldMarks.length; j++) {
                        if (val >= globe.yieldMarks[j]) {
                            return globe.yieldColors[j];
                        }
                    }
                }
            }
            return "gray";
        });
}

    


module.exports = Globe;


    // intersting animation to have later:
    // 1. small rotating
    // svg.append("path")
    //     .attr("d", "M10,110 A120,120 -45 0,1 110 10 A120,120 -45 0,1 10,110")
    //     .attr("fill", "none")
    //     .attr("id", "theMotionPath")

    //for each path do:
    // const motion = d3.select(this)
                //     .append("animateMotion")
                //     .attr("dur", "6s")
                //     .attr("repeatCount", "indefinite")
                //     .attr("rotate", "0")

                // motion.append("mpath")
                //     .attr("href", "#theMotionPath")


    // 2. rotate outside the screen
    // d3.select(this).transition().duration(5000)
                //     .attrTween("transform", rotTween);

                // function rotTween() {
                //     var i = d3.interpolate(0, 360);
                //     return function (t) {
                //         return "rotate(" + i(t) + ",50,50)";
                //     };
                // }