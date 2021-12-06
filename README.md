# Global-Warming-on-Food

## About

### Ever wonder how global warming is affecting food supply around the world?

Food supply is one of the more critical impacts of global warming. As the world becomes warmer, some countries may end up producing more food, while others' yield rate will decrease.

Take a look at how the major crops (wheat, rice, maize) yield rate will be affected in the next 60 years on [my data visualization site](https://em0227.github.io/Global-Warming-on-Food/) and find out your own answers to the question.

![alt demo-gif](https://github.com/em0227/Global-Warming-on-Food/blob/main/src/images/global-warming-food-demo.gif?raw=true)

## Technologies & Libraries

1. Vanilla Javascript
2. D3.js
3. CSS
4. HTML

<br>

## Core Features:

### \* A Self-turning Interactive Globe!

Users can hover over the globe and it will stop turning. Users can then choose a specific country. In the near future, users will be able to click on a specific country and see the country's crop yield changes over the years.

```javascript
Globe.prototype.rotate = function () {
  const countries = document.getElementsByClassName("country");
  const globe = this;

  this.setIntervalId = setInterval(() => {
    globe.changeRotationAngle();
    for (let i = 0; i < countries.length; i++) {
      const country = d3.select(countries[i]);
      country
        .attr("class", "country rotate-true")
        .attr(
          "d",
          d3.geoPath(
            globe.projection.rotate([globe.rotationDegree, globe.axisDegree])
          )
        );
    }
  }, 50);
};
```

### \* Data on the Global Crop Yield Changes

Based on the CO2 scenario, year, and crop the users choose, the globe and the scatter plot will render different results, and users can observe the changes.

```javascript
Globe.prototype.updateData = async function (crop, scenario, year) {
  const g = d3.select(".countries");
  const globe = this;
  let cropData = await d3.csv("./src/data/crops-yield-changes.csv");
  g.selectAll(".country").style("fill", function (d) {
    const currentCountry = cropData.find(
      (country) => country["CountryName"] === this.id
    );
    if (currentCountry) {
      const val = currentCountry[`${crop}${scenario}${year}`];
      for (let i = 0; i < globe.yieldMarks.length; i++) {
        if (val >= globe.yieldMarks[i]) {
          return globe.yieldColors[i];
        }
      }
    } else {
      return "gray";
    }
  });
};
```

### \* Responsive Design for Mobile Users

The website is optimized for mobile users as well!

```
@media only screen and (max-width: 500px) {
    h1 {
        font-size: 25px;
    }

    .globe-container {
        flex-direction: column;
    }

    //...
}
```

<br>

## Data sources

hi
https://sedac.ciesin.columbia.edu/data/set/crop-climate-effects-climate-global-food-production/data-download
