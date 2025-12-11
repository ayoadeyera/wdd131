/* ================================================= */
/*           THE ASCENT PATH - MAIN JAVASCRIPT       */
/* ================================================= */

// --- UTILITY FUNCTIONS ---

/**
 * Get data from localStorage
 * @param {string} key - The key to retrieve
 * @returns {any} Parsed data or null
 */
function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error getting ${key} from storage:`, error);
        return null;
    }
}

/**
 * Save data to localStorage
 * @param {string} key - The key to store under
 * @param {any} data - The data to store
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to storage:`, error);
    }
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Set last modified date in footer
 */
function setLastModified() {
    const modifiedElement = document.getElementById('last-modified');
    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}

/**
 * Highlight active navigation link based on current page
 */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// --- NAVIGATION MENU ---

/**
 * Toggle mobile navigation menu
 */
function initHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerButton.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// --- COURSE DATA & MANAGEMENT ---

const coursesData = [
    {
        id: 1,
        title: "Morning Mastery",
        slug: "morning-mastery",
        category: "clarity",
        description: "Transform your mornings with intentional routines that set the tone for productive, focused days.",
        image: "images/course-morning-mastery.jpg",
        duration: "4 weeks",
        level: "Beginner",
        price: "$97",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 2,
        title: "Deep Work Intensive",
        slug: "deep-work-intensive",
        category: "mastery",
        description: "Master the art of focused work and eliminate distractions to achieve peak productivity.",
        image: "images/course-deep-work.jpg",
        duration: "6 weeks",
        level: "Intermediate",
        price: "$147",
        instructor: "Michael Chen"
    },
    {
        id: 3,
        title: "Purpose Discovery",
        slug: "purpose-discovery",
        category: "clarity",
        description: "Uncover your life's purpose through guided reflection, values assessment, and vision crafting.",
        image: "images/course-purpose.jpg",
        duration: "8 weeks",
        level: "Beginner",
        price: "$197",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 4,
        title: "Accountability Partners",
        slug: "accountability-partners",
        category: "community",
        description: "Connect with like-minded individuals for mutual support, accountability, and shared growth.",
        image: "images/course-accountability.jpg",
        duration: "Ongoing",
        level: "All Levels",
        price: "$47/month",
        instructor: "Elena Patel"
    },
    {
        id: 5,
        title: "Peak Performance Protocol",
        slug: "peak-performance",
        category: "mastery",
        description: "Advanced techniques for sustaining high performance without burnout.",
        image: "images/course-performance.jpg",
        duration: "12 weeks",
        level: "Advanced",
        price: "$297",
        instructor: "Michael Chen"
    },
    {
        id: 6,
        title: "Mindful Leadership",
        slug: "mindful-leadership",
        category: "community",
        description: "Lead with clarity, compassion, and effectiveness through mindful practices.",
        image: "images/course-leadership.jpg",
        duration: "10 weeks",
        level: "Intermediate",
        price: "$247",
        instructor: "Elena Patel"
    },
    {
        id: 7,
        title: "Goal Setting Framework",
        slug: "goal-setting",
        category: "clarity",
        description: "Learn a systematic approach to setting and achieving meaningful goals.",
        image: "images/course-goals.jpg",
        duration: "3 weeks",
        level: "Beginner",
        price: "$77",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 8,
        title: "Time Mastery System",
        slug: "time-mastery",
        category: "mastery",
        description: "Revolutionary time management techniques used by top performers.",
        image: "images/course-time.jpg",
        duration: "5 weeks",
        level: "Intermediate",
        price: "$127",
        instructor: "Michael Chen"
    },
    {
        id: 9,
        title: "Community Networking",
        slug: "community-networking",
        category: "community",
        description: "Build meaningful professional relationships and expand your network authentically.",
        image: "images/course-networking.jpg",
        duration: "6 weeks",
        level: "All Levels",
        price: "$97",
        instructor: "Elena Patel"
    }
];

/**
 * Get user's favorite courses from localStorage
 * @returns {Array} Array of favorite course IDs
 */
function getFavorites() {
    return getFromStorage('favorites') || [];
}

/**
 * Toggle course favorite status
 * @param {number} courseId - The course ID to toggle
 */
function toggleFavorite(courseId) {
    let favorites = getFavorites();
    
    if (favorites.includes(courseId)) {
        favorites = favorites.filter(id => id !== courseId);
    } else {
        favorites.push(courseId);
    }
    
    saveToStorage('favorites', favorites);
    return favorites.includes(courseId);
}

/**
 * Filter courses by category
 * @param {string} category - Category to filter by ('all' or specific category)
 * @returns {Array} Filtered courses
 */
function filterCourses(category) {
    if (category === 'all') {
        return coursesData;
    }
    return coursesData.filter(course => course.category === category);
}

function createCourseCard(course) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(course.id);
    const heartIcon = isFavorite ? '❤️' : '🤍';
    
    return `
        <div class="card course-card" data-course-id="${course.id}">
            <img src="${course.image}" alt="${course.title}" loading="lazy">
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3>${course.title}</h3>
                    <button class="favorite-btn" data-course-id="${course.id}" 
                            style="background: none; border: none; font-size: 1.5rem; cursor: pointer;"
                            aria-label="Toggle favorite">
                        ${heartIcon}
                    </button>
                </div>
                <p>${course.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                    <span style="font-size: 0.9rem; color: #666;">
                        ${course.duration} • ${course.level}
                    </span>
                    <a href="course-${course.slug}.html" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                        Enroll Now
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render courses to the page
 * @param {Array} courses - Array of courses to render
 */
function renderCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;
    
    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                No courses found in this category.
            </p>
        `;
        return;
    }
    
    coursesGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');
    
    // Add event listeners to favorite buttons
    const favoriteButtons = coursesGrid.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = parseInt(btn.getAttribute('data-course-id'));
            const isFavorite = toggleFavorite(courseId);
            btn.textContent = isFavorite ? '❤️' : '🤍';
        });
    });
}

/**
 * Initialize course filtering
 */
function initCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const coursesGrid = document.getElementById('courses-grid');
    
    if (!filterButtons.length || !coursesGrid) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter and render courses
            const category = btn.getAttribute('data-category');
            const filteredCourses = filterCourses(category);
            renderCourses(filteredCourses);
        });
    });
    
    // Render all courses initially
    renderCourses(coursesData);
}

// --- FORM VALIDATION ---

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
function validatePassword(password) {
    return password.length >= 6;
}

/**
 * Show error message for form field
 * @param {HTMLElement} formGroup - Form group element
 * @param {string} message - Error message
 */
function showError(formGroup, message) {
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear error message for form field
 * @param {HTMLElement} formGroup - Form group element
 */
function clearError(formGroup) {
    formGroup.classList.remove('error');
}

/**
 * Validate form field
 * @param {HTMLElement} input - Input element
 * @returns {boolean} True if valid
 */
function validateField(input) {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    clearError(formGroup);
    
    // Required field check
    if (input.hasAttribute('required') && !value) {
        showError(formGroup, 'This field is required');
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && value && !validateEmail(value)) {
        showError(formGroup, 'Please enter a valid email address');
        return false;
    }
    
    // Password validation
    if (input.type === 'password' && value && !validatePassword(value)) {
        showError(formGroup, 'Password must be at least 6 characters');
        return false;
    }
    
    // Min length check
    const minLength = input.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        showError(formGroup, `Minimum ${minLength} characters required`);
        return false;
    }
    
    return true;
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const form = document.getElementById('community-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            handleFormSubmission(form);
        }
    });
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleFormSubmission(form) {
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        interest: form.querySelector('#interest').value,
        message: form.querySelector('#message').value,
        newsletter: form.querySelector('#newsletter').checked,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const submissions = getFromStorage('formSubmissions') || [];
    submissions.push(formData);
    saveToStorage('formSubmissions', submissions);
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.textContent = `Thank you, ${formData.name}! We'll be in touch soon.`;
    }
    
    // Reset form
    form.reset();
    
    // Clear any remaining errors
    form.querySelectorAll('.form-group').forEach(group => clearError(group));
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }, 5000);
}

// --- LOGIN FUNCTIONALITY ---

/**
 * Initialize login tabs
 */
function initLoginTabs() {
    const tabs = document.querySelectorAll('.login-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Handle login form submission
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('#login-email');
            const password = loginForm.querySelector('#login-password');
            
            let isValid = true;
            
            if (!validateField(email)) isValid = false;
            if (!validateField(password)) isValid = false;
            
            if (isValid) {
                // Save login session
                const userData = {
                    email: email.value,
                    loginTime: new Date().toISOString()
                };
                saveToStorage('userSession', userData);
                
                // Redirect to success page
                window.location.href = 'success.html';
            }
        });
        
        // Real-time validation
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = signupForm.querySelector('#signup-name');
            const email = signupForm.querySelector('#signup-email');
            const password = signupForm.querySelector('#signup-password');
            
            let isValid = true;
            
            if (!validateField(name)) isValid = false;
            if (!validateField(email)) isValid = false;
            if (!validateField(password)) isValid = false;
            
            if (isValid) {
                // Save user data
                const userData = {
                    name: name.value,
                    email: email.value,
                    signupTime: new Date().toISOString()
                };
                saveToStorage('userSession', userData);
                
                // Redirect to success page
                window.location.href = 'success.html';
            }
        });
        
        // Real-time validation
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
}

// --- REVIEW COUNTER ---

/**
 * Get review counter from localStorage
 * @returns {number} Current review count
 */
function getReviewCount() {
    return getFromStorage('reviewCount') || 0;
}

/**
 * Increment review counter
 */
function incrementReviewCount() {
    const currentCount = getReviewCount();
    const newCount = currentCount + 1;
    saveToStorage('reviewCount', newCount);
    return newCount;
}

function displayReviewCount() {
    const counterElement = document.getElementById('review-count');
    if (counterElement) {
        const count = incrementReviewCount();
        counterElement.textContent = count;
    }
}

function displayUserInfo() {
    const userSession = getFromStorage('userSession');
    const userNameElement = document.getElementById('user-name');
    
    if (userSession && userNameElement) {
        const name = userSession.name || userSession.email.split('@')[0];
        userNameElement.textContent = name;
    }
}

function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseSlug = urlParams.get('course');
    
    if (!courseSlug) return;
    
    const course = coursesData.find(c => c.slug === courseSlug);
    if (!course) return;
    
    const titleElement = document.getElementById('course-title');
    const imageElement = document.getElementById('course-image');
    const descElement = document.getElementById('course-description');
    const durationElement = document.getElementById('course-duration');
    const levelElement = document.getElementById('course-level');
    const priceElement = document.getElementById('course-price');
    const instructorElement = document.getElementById('course-instructor');
    
    if (titleElement) titleElement.textContent = course.title;
    if (imageElement) {
        imageElement.src = course.image;
        imageElement.alt = course.title;
    }
    if (descElement) descElement.textContent = course.description;
    if (durationElement) durationElement.textContent = course.duration;
    if (levelElement) levelElement.textContent = course.level;
    if (priceElement) priceElement.textContent = course.price;
    if (instructorElement) instructorElement.textContent = course.instructor;
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModified();
    highlightActiveNav();
    initHamburgerMenu();
    initCourseFilters();
    initFormValidation();
    initLoginTabs();
    initLoginForm();
    
    if (window.location.pathname.includes('success.html')) {
        displayUserInfo();
        displayReviewCount();
    }
    
    if (window.location.pathname.includes('course-')) {
        loadCourseDetails();
    }
});