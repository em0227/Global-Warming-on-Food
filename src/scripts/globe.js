

    function Globe(result) {

        const canvas = document.getElementById("map-canvas");
        const ctx = canvas.getContext('2d');
        const radius = 400;
        this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);
        const path = d3.geoPath(this.projection, ctx);
        this.degree = 0;

        this.draw(ctx, path, radius, result);
        
        setInterval(() => {
            this.projection.rotate([this.change(), 0]);
            this.draw(ctx, path, radius, result);
        }, 500)

    }

    Globe.prototype.draw = function (ctx, path, radius, result) {
        // Draw the seas.
        ctx.lineWidth = 1.5;
        ctx.fillStyle = "aliceblue";
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
        // ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
    }
            
    Globe.prototype.change = function(degree) {
        this.degree += 10;
        if (this.degree === 360) this.degree = 0;
        return this.degree
    }


    module.exports = Globe;
