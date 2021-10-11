
function Globe(result) {

    const radius = 400;
    this.axisDegree = 0
    this.rotationDegree = 0;
    this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);
    this.setIntervalId = 0;

    const svg = d3.select(".globe")
        .append("svg")
        .attr("class", "globe-map")
        .attr("width", "100%")
        .attr("height", "70%")
        .attr("viewBox", "0 0 2000 1000");
    
    const g = svg.append("g")
        .attr("class", "countries");

    // const tip = d3.tip()
    //     .attr('class', 'country-tip').html(function (d) { return d; });

    // g.call(tip)

    g.selectAll("path")
        .data(result.features)
        .enter()
        .append("path")
        .attr('class', "country")
        .attr("id", d => {
            return d.properties.name;
        })
        .attr("d", d3.geoPath(this.projection));
        // .on("mouseover", tip.show)
        // .on("mouseout", function () {
        //     d3.select(this)
        //         .attr("class", "country");
        // })
    
    d3.select(".country").each(function(d, i) {
        console.log(this.id)
        const name = this.id
        d3.select(this).append("title").text(name)
        // debugger
        // d3.select(this.title)

    })
    
    const graticule = d3.geoGraticule();

    const g2 = svg.append("g")
        .attr("class", "graticule-outline");

    g2.selectAll("path")
        .data([graticule()])
        .enter()
        .append("path")
        .attr("class", "graticule")
        .attr("d", d3.geoPath(this.projection));
}

Globe.prototype.rotate = function() {
    const countries = document.getElementsByClassName("country");
    const globe = this;

    this.setIntervalId = setInterval(() => {      
        globe.changeRotationAngle();
        for (let i = 0; i < countries.length; i++) {
            const country = d3.select(countries[i]);
            country.attr("d", d3.geoPath(globe.projection.rotate([globe.rotationDegree, globe.axisDegree])))
        }
    }, 300);


    
}
        
Globe.prototype.changeRotationAngle = function() {
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