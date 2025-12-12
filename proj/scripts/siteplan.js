// Set current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

// Set last modified date in the footer
const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;