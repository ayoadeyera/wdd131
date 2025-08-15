// Get the span element where the current year will be displayed
const copyrightYearSpan = document.getElementById("current-year");

// Get the current year using JavaScript's Date object
const currentYear = new Date().getFullYear();

// Set the text content of the span to the current year
copyrightYearSpan.textContent = currentYear;


// Get the span element where the last modified date will be displayed
const lastModifiedSpan = document.getElementById("last-modified");

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Set the text content of the span to the last modified date
lastModifiedSpan.textContent = lastModifiedDate;


// Select the hamburger menu button and the navigation element
const hamButton = document.querySelector('#menu');
const navElement = document.querySelector('nav');

// Add a click event listener to the hamburger button
hamButton.addEventListener('click', () => {
    // Toggle the 'open' class on the nav element to show/hide the menu
    navElement.classList.toggle('open');

    // Toggle the 'open' class on the button to change its icon
    hamButton.classList.toggle('open');
});

//Replace deleted html dynamically

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
];



function displayFilteredTemples(filteredTemples) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Clear previous cards

    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        card.classList.add("temple-card");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);

        gallery.appendChild(card);
    });
}

// Add event listeners to nav menu items
document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove 'active' class from all links and add to clicked one
        document.querySelectorAll('#main-nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');

        let filter = this.textContent.trim();

        let filtered;
        switch (filter) {
            case "Old":
                filtered = temples.filter(t => {
                    // Extract year from dedicated string
                    let year = parseInt(t.dedicated.split(',')[0]);
                    return year < 1900;
                });
                break;
            case "New":
                filtered = temples.filter(t => {
                    let year = parseInt(t.dedicated.split(',')[0]);
                    return year > 2000;
                });
                break;
            case "Large":
                filtered = temples.filter(t => t.area > 90000);
                break;
            case "Small":
                filtered = temples.filter(t => t.area < 10000);
                break;
            default: // Home
                filtered = temples;
        }

        displayFilteredTemples(filtered);
    });
});

// Display all temples on initial page load
displayFilteredTemples(temples);