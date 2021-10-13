
const RenderObj = {
    renderSlider() {
        const slider = document.querySelector(".scenario-slider");

        const sliderInput = document.createElement("input");
        sliderInput.setAttribute("id", "scenario-slider-input");
        sliderInput.setAttribute("type", "range");
        sliderInput.setAttribute("min", 1);
        sliderInput.setAttribute("max", 4);
        sliderInput.setAttribute("step", 1);
        sliderInput.setAttribute("value", 1);
        sliderInput.setAttribute("style", "width: 90%");

        slider.appendChild(sliderInput);

    },

    moreInfoToolTip() {
    const infoDiv = document.querySelector(".more-info")
    const table = document.createElement("table");
    const firstRow = ["Year", "", "A1FI", "A2", "B1", "B2"];
    const secondRow = ["1990s", "CO2 levels", "358", "358", "358", "358"];
    const thirdRow = ["2020s", "CO2 levels", "432", "432", "421", "422"];
    const fourthRow = ["2050s", "CO2 levels", "590", "549", "492", "488"];
    const fifthRow = ["2080s", "CO2 levels", "810", "709", "527", "561"];
    const tr1 = document.createElement("tr");
    infoDiv.appendChild(table);
    table.appendChild(tr1);

    for (let i = 0; i < firstRow.length; i++) {
        let el = firstRow[i];
        let th = document.createElement("th");
        th.innerHTML = el;
        tr1.appendChild(th);
    }

    function fillRows(arr) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let i = 0; i < arr.length; i++) {
            let el = arr[i];
            let td = document.createElement("td");
            td.innerHTML = el;
            tr.appendChild(td);
        }
    }

    fillRows(secondRow);
    fillRows(thirdRow);
    fillRows(fourthRow);
    fillRows(fifthRow);

    const wikiLink = document.createElement("a");
    wikiLink.setAttribute("href", "https://en.wikipedia.org/wiki/Special_Report_on_Emissions_Scenarios");
    wikiLink.setAttribute("target", "_blank");
    wikiLink.style.textDecoration = "underline";
    wikiLink.innerHTML = "Emissions Scenarios Wiki";
    infoDiv.appendChild(wikiLink);
    }  
}

module.exports = RenderObj;