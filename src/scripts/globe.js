
// const d3 = require('d3');


document.addEventListener("DOMContentLoaded", function() {


    function Globe() {

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
        c.beginPath(), c.arc(s / 2, s / 2, radius, 0, 2 * Math.PI), c.fill(), c.stroke();

        // Draw the land.
        c.lineWidth = 0.35;
        c.fillStyle = "mintcream";
        // c.beginPath(), path(world()), c.fill(), c.stroke();
        world(c, path)

        this.render()
        setInterval(() => {
            this.projection.rotate([this.change(), 0])
            console.log(this.degree)
            return this.canvas
        }, 500)

    }

    // const world = FileAttachment("land-50m.json").json()
    
    // console.log(world)
    let world 

    function world(c, path) {
        fetch("https://unpkg.com/world-atlas@1.1.4/world/110m.json")
        .then(res => res.json())
        .then((world) => {
            console.log(world)
            const result = topojson.feature(world, world.objects.countries);
            c.beginPath(), path(result), c.fill(), c.stroke();
        })
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




    return new Globe()

})
