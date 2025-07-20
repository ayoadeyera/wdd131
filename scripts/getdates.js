// Get the current year for the copyright
const copyrightYearSpan = document.getElementById("current-year");

if (copyrightYearSpan) {
    const currentYear = new Date().getFullYear();
    copyrightYearSpan.textContent = currentYear;
}

// Get the last modified date of the document
const lastModifiedSpan = document.getElementById("last-modified");

if (lastModifiedSpan) {
    const lastModifiedDate = document.lastModified;
    lastModifiedSpan.textContent = lastModifiedDate;
}