const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function initializeForm() {
    updateFooterDates();
    populateProductSelect(products);
    attachFormSubmitHandler();
    // Review counter logic is intentionally handled on the review.html page.
}

/**
 * Populates the 'Product Name' select element.
 * @param {Array<Object>} productData - Array of product objects.
 */
function populateProductSelect(productData) {
    const productSelect = document.getElementById('products');
    if (!productSelect) return;

    productData.forEach(product => {
        const option = document.createElement('option');
        // Set value to product ID and text content to product name
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

/**
 * Updates the current year and last modified date in the footer.
 */
function updateFooterDates() {
    const currentYearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

/**
 * Attach submit handlers to forms present on the page so we can mark
 * the session as "just submitted" before the browser navigates to review.html.
 * We set a sessionStorage flag that the review page will read and then clear.
 */
function attachFormSubmitHandler() {
    try {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function () {
                try {
                    sessionStorage.setItem('submittedReview', 'true');
                } catch (err) {
                    // sessionStorage might be disabled, fail silently
                }
            }, true);
        });
    } catch (err) {
        // If querySelectorAll fails (very unlikely), ignore.
    }
}

// Initialize the script when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeForm);
