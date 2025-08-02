// Set the current year in the copyright section
const copyrightYearSpan = document.getElementById("current-year");
const currentYear = new Date().getFullYear();
copyrightYearSpan.textContent = currentYear;

// Display the last modified date of the document
const lastModifiedSpan = document.getElementById("last-modified");
const lastModifiedDate = document.lastModified;
lastModifiedSpan.textContent = lastModifiedDate;

// Calculate and display wind chill
const temperature = 10; // Temperature in °C
const windSpeed = 4.8;  // Wind speed in km/h

function calculateWindChill(tempC, speedKmh) {
    // Convert to Fahrenheit and mph
    const tempF = (tempC * 9 / 5) + 32;
    const speedMph = speedKmh * 0.621371;

    // Apply wind chill formula (only if temp ≤ 50°F and speed > 3 mph)
    return (tempF <= 50 && speedMph > 3)
        ? Math.round(35.74 + 0.6215 * tempF - 35.75 * Math.pow(speedMph, 0.16) + 0.4275 * tempF * Math.pow(speedMph, 0.16))
        : "N/A";
}

document.getElementById('windchill').textContent = calculateWindChill(temperature, windSpeed) + " °C";
