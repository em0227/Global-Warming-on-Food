

    function Globe(result) {

        // const canvas = document.getElementById("map-canvas");
        // const ctx = canvas.getContext('2d');


        const radius = 400;
        const axisDegree = 0
        this.rotationDegree = 0;
        this.result = result;
        this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);

        const svg = d3.select(".globe")
            .append("svg")
            .attr("class", "globe-map")
            .attr("viewBox", "0 0 1500 1500");
        
        svg.append("path")
            .attr("d", "M10,110 A120,120 -45 0,1 110 10 A120,120 -45 0,1 10,110")
            .attr("fill", "none")
            .attr("id", "theMotionPath")

        
        const g = svg.append("g")
            .attr("class", "countries")

        g.selectAll("path")
            .data(this.result.features)
            .enter()
            .append("path")
            .attr('class', "country")
            .attr("d", d3.geoPath(this.projection))

        const countries = d3.selectAll(".country")

        console.log(countries)

        
        
            // countries.each( function(d, i) {
                // const motion = d3.select(this)
                //     .append("animateMotion")
                //     .attr("dur", "6s")
                //     .attr("repeatCount", "indefinite")
                //     .attr("rotate", "0")
            
                // motion.append("mpath")
                //     .attr("href", "#theMotionPath")


                // d3.select(this).attr("points", "60,30 90,90 30,90")

                // d3.select(this)
                //     .append("animationTransform")
                //     .attr("attributeName", "transform")
                //     .attr("attributeType", "XML")
                //     .attr("type", "rotate")
                //     .attr("from", "0 60 70 ")
                //     .attr("to", "360 60 70")
                //     .attr("dur", "6s")
                //     .attr("repeatCount", "indefinite")

                // d3.select(this).transition().duration(5000)
                //     .attrTween("transform", rotTween);

                // function rotTween() {
                //     var i = d3.interpolate(0, 360);
                //     return function (t) {
                //         return "rotate([" + i(t) + ",50,50)";
                //     };
                // }
                
                // d3.select(this)
                //     .attr("d", d3.geoPath(that.projection.rotate([that.rotationDegree, axisDegree])))
            // })
    


        // this.path = d3.geoPath(this.projection, ctx);
        

        // this.draw(ctx, this.path, radius, this.result);
        
        // setInterval(() => {
        //     this.rotate();
        //     this.projection.rotate([this.rotationDegree, axisDegree]);
            // this.draw(ctx, this.path, radius, this.result);
            // const svg = d3.select(".globe")
            //     .append("svg")
            //     .attr("class", "globe-map")
            //     .attr("viewBox", "0 0 1500 1500");

            // const g = svg.append("g")
            //     .attr("class", "countries");

            // g.selectAll("path")
            //     .data(this.result.features)
            //     .enter()
            //     .append("path")
            //     .attr('class', "country")
            //     .attr("d", d3.geoPath(this.projection))
            
            
        // }, 500)

        setTimeout(function () {
            
            countries.each(function (d, i) {
                d3.select(this)
                    .attr("d", d3.geoPath(d3.geoOrthographic().scale(400).precision(0.2).translate([600, 500]).rotate([90,0])))
            })
        }.bind(this), 5000)

    }

    Globe.prototype.draw = function (ctx, path, radius, result) {
        // Draw the seas.
        ctx.lineWidth = 1.5;
        ctx.fillStyle = "aliceblue";
        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.arc(600, 500, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw the land.
        ctx.lineWidth = 0.35;
        ctx.fillStyle = "mintcream";
        ctx.beginPath();
        path(result);
        ctx.fill();
        ctx.stroke();

        //the gratitcule
        graticule = d3.geoGraticule10()
        ctx.beginPath();
        path(graticule);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
    }
            
    Globe.prototype.rotate = function() {
        this.rotationDegree += 10;
        if (this.rotationDegree === 360) this.rotationDegree = 0;
    }

    // Globe.prototype.eventMouseover = function() {
    //     this.addEventListener("mouseover", e => {
    //         const name = e.target.__data__.properties.name;

    // })
    // }


    module.exports = Globe;
