
// const d3 = require('d3');


document.addEventListener("DOMContentLoaded", async function() {
    const world = await fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(res => res.json())
    const result = topojson.feature(world, world.objects.countries);

    function Globe(result) {

        const s = 450
        const radius = 225
        this.degree = 0

        this.canvas = document.getElementById("map-canvas");
        const c = this.canvas.getContext('2d');

        this.projection = d3.geoOrthographic().scale(radius).translate([s / 2, s / 2]);
        
        const path = d3.geoPath(this.projection, c);

        // Draw the seas.
        c.lineWidth = 1.5;
        c.fillStyle = "aliceblue";
        c.beginPath();
        c.arc(s / 2, s / 2, radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();

        // Draw the land.
        c.lineWidth = 0.35;
        c.fillStyle = "mintcream";
        c.beginPath(); 
        path(result);
        c.fill();
        c.stroke();

        this.render()
        setInterval(() => {
            this.projection.rotate([this.change(), 0])
            console.log(this.degree)
            c.lineWidth = 1.5;
            c.fillStyle = "aliceblue";
            c.beginPath();
            c.arc(s / 2, s / 2, radius, 0, 2 * Math.PI);
            c.fill();
            c.stroke();

            // Draw the land.
            c.lineWidth = 0.35;
            c.fillStyle = "mintcream";
            c.beginPath();
            path(result);
            c.fill();
            c.stroke();

        }, 500)

    }
            
    Globe.prototype.change = function() {
        this.degree += 10;
        if (this.degree === 360) {
            this.degree = 0;
        }
        return this.degree
    }

    Globe.prototype.render = function (params) {
        
    }

    new Globe(result)
})
