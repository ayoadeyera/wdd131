/* 1 step: Start with the Base script used for previous footer */
// Get the current year for the copyright
const copyrightYearSpan = document.getElementById("current-year");
const currentYear = new Date().getFullYear();
copyrightYearSpan.textContent = currentYear;

// Get the last modified date of the document
const lastModifiedSpan = document.getElementById("last-modified");
const lastModifiedDate = document.lastModified;
lastModifiedSpan.textContent = lastModifiedDate;

// 2 step: Write code for the hamburger menu interation
// create variable first and target your selector
const hamButton = document.querySelector('#menu');
const navElement = document.querySelector('nav');
//Use Eventlistiener to fire an action for interactivity
hamButton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamButton.classList.toggle('open');
});