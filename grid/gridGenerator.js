//Javascript class to generate colorful grids
function gridGenerator(divId) {
    //Constructor
    var outerDiv = document.getElementById(divId);

    //Private variable for refresh colors timer
    var refreshTimer;

    //Private function
    var getRandomColor = function () {
        return '#' + Math.random().toString(16).substring(2, 8);
    }

    //Private function to refresh Colors of grid
    var refreshColors = function () {
        var divs = outerDiv.getElementsByTagName("div");
        for (var i = divs.length - 1; i >= 0; i--) {
            divs[i].style.background = getRandomColor();
        }
    }

    //Public Function to generate grid
    this.generate = function (rows, columns) {
        while (outerDiv.hasChildNodes()) {
            outerDiv.removeChild(outerDiv.firstChild);
        }

        var divHeight = window.innerHeight / rows;
        for (var i = 0; i < rows * columns; i++) {
            var div = document.createElement("div");
            div.style.cssFloat = "left";
            div.style.width = 100 / columns + "%";
            div.style.height = 100 / rows + "%";
            div.style.background = getRandomColor();
            outerDiv.appendChild(div);
        };
    }

    //Public Function to refresh colors
    this.setRefreshColorsTimer = function (timeInSeconds) {
        if (refreshTimer) {
            clearInterval(refreshTimer);
        }

        refreshTimer = setInterval(refreshColors, timeInSeconds * 1000);
    }
};