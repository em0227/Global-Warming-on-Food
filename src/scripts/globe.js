
function Globe(result) {

    const radius = 400;
    const axisDegree = 0
    this.rotationDegree = 0;
    this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);

    const svg = d3.select(".globe")
        .append("svg")
        .attr("class", "globe-map")
        .attr("viewBox", "0 0 1500 1500");
    
    const graticule = d3.geoGraticule();

    console.log(graticule)

    const g2 = svg.append("g")
        .attr("class", "graticule-outline")

    g2.selectAll("path")
        .data([graticule()])
        .enter()
        .append("path")
        .attr("class", "graticule")
        .attr("d", d3.geoPath(this.projection));
    
    const g = svg.append("g")
        .attr("class", "countries")

    g.selectAll("path")
        .data(result.features)
        .enter()
        .append("path")
        .attr('class', "country")
        .attr("id", d => {
            return d.properties.name;
        })
        .attr("d", d3.geoPath(this.projection))
        .on("mouseover", function() {
            // console.log(this);
            d3.select(this)
                .attr("class", "country-hover");
            // const name = e.properties.name

            // e.innerHTML = name;
            
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("class", "country");
        })
        

    


    const countries = document.getElementsByClassName("country")

    setInterval(() => {
        const globe = this;
        globe.rotate();
        for (let i = 0; i < countries.length; i++) {
            const country = d3.select(countries[i]);
            country.attr("d", d3.geoPath(globe.projection.rotate([globe.rotationDegree, axisDegree])))
        }
    }, 500);
    
}
        
Globe.prototype.rotate = function() {
    this.rotationDegree += 10;
    if (this.rotationDegree === 360) this.rotationDegree = 0;
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