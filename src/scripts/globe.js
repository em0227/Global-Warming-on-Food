

    function Globe(result) {


        
        const radius = 400
        this.degree = 0

        this.canvas = document.getElementById("map-canvas");
        const c = this.canvas.getContext('2d');

        this.projection = d3.geoOrthographic().scale(radius).precision(0.2).translate([600, 500]);
        
        const path = d3.geoPath(this.projection, c);

        

        // Draw the seas.
        c.lineWidth = 1.5;
        c.fillStyle = "aliceblue";
        c.beginPath();
        c.arc(600, 500, radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();

        // Draw the land.
        c.lineWidth = 0.35;
        c.fillStyle = "mintcream";
        c.beginPath(); 
        path(result);
        c.fill();
        c.stroke();

        //the gratitcule
        graticule = d3.geoGraticule10()
        c.beginPath();
        path(graticule);
        // c.strokeStyle = "#ccc";
        c.stroke();

        
        
        setInterval(() => {
            this.projection.rotate([this.change(), 0])

            
            c.lineWidth = 0.7;
            c.fillStyle = "aliceblue";
            c.beginPath();
            c.arc(600, 500, radius, 0, 2 * Math.PI);
            c.fill();
            c.stroke();

            
            c.lineWidth = 0.35;
            c.fillStyle = "mintcream";
            c.beginPath();
            path(result);
            c.fill();
            c.stroke();

            graticule = d3.geoGraticule10()
            c.beginPath();
            path(graticule);
            // c.strokeStyle = "#ccc";
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


    module.exports = Globe;
