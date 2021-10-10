

    function Globe(result) {

        const canvas = document.getElementById("map-canvas");
        const ctx = canvas.getContext('2d');




        
        const radius = 400;
        const axisDegree = 0
        this.rotationDegree = 0;
        this.result = result;
        this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);
        this.path = d3.geoPath(this.projection, ctx);
        

        this.draw(ctx, this.path, radius, this.result);
        
        setInterval(() => {
            this.rotate();
            this.projection.rotate([this.rotationDegree, axisDegree]);
            this.draw(ctx, this.path, radius, this.result);
        }, 500)

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
