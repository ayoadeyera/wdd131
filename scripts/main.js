// --- Common functionality for footer dates and hamburger menu ---

// Get the span element where the current year will be displayed
const copyrightYearSpan = document.getElementById("current-year");
if (copyrightYearSpan) {
    // Get the current year using JavaScript's Date object
    const currentYear = new Date().getFullYear();
    // Set the text content of the span to the current year
    copyrightYearSpan.textContent = currentYear;
}

// Get the span element where the last modified date will be displayed
const lastModifiedSpan = document.getElementById("last-modified");
if (lastModifiedSpan) {
    // Get the last modified date of the document
    const lastModifiedDate = document.lastModified;
    // Set the text content of the span to the last modified date
    lastModifiedSpan.textContent = `Last Modification: ${lastModifiedDate}`;
}

// Select the hamburger menu button and the navigation element
const hamButton = document.querySelector('#menu');
const navElement = document.querySelector('nav');

if (hamButton && navElement) {
    // Add a click event listener to the hamburger button
    hamButton.addEventListener('click', () => {
        // Toggle the 'open' class on the nav element to show/hide the menu
        navElement.classList.toggle('open');
        // Toggle the 'open' class on the button to change its icon
        hamButton.classList.toggle('open');
    });
}