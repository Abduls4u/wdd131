document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}

const temp = parseFloat(document.getElementById("temp").textContent);
const wind = parseFloat(document.getElementById("wind").textContent);

let windChill = "N/A";
if (temp <= 10 && wind > 4.8) {
  windChill = calculateWindChill(temp, wind) + "°C";
}

document.getElementById("windchill").textContent = windChill;
