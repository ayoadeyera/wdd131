const coursesData = [
    {
        id: 1,
        title: "Morning Mastery",
        slug: "morning_mastery",
        category: "clarity",
        description: "Transform your mornings with intentional routines that set the tone for productive, focused days.",
        image: "images/clarity_path.jpg",
        duration: "4 weeks",
        level: "Beginner",
        price: "$97",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 2,
        title: "Deep Work Intensive",
        slug: "deep_work_intensive",
        category: "mastery",
        description: "Master the art of focused work and eliminate distractions to achieve peak productivity.",
        image: "images/mastery_path.png",
        duration: "6 weeks",
        level: "Intermediate",
        price: "$147",
        instructor: "Michael Chen"
    },
    {
        id: 3,
        title: "Purpose Discovery",
        slug: "purpose_discovery",
        category: "clarity",
        description: "Uncover your life's purpose through guided reflection, values assessment, and vision crafting.",
        image: "images/clarity_path.jpg",
        duration: "8 weeks",
        level: "Beginner",
        price: "$197",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 4,
        title: "Accountability Partners",
        slug: "accountability_partners",
        category: "community",
        description: "Connect with like-minded individuals for mutual support, accountability, and shared growth.",
        image: "images/comm_path.webp",
        duration: "Ongoing",
        level: "All Levels",
        price: "$47/month",
        instructor: "Elena Patel"
    },
    {
        id: 5,
        title: "Peak Performance Protocol",
        slug: "peak_performance",
        category: "mastery",
        description: "Advanced techniques for sustaining high performance without burnout.",
        image: "images/peak_perform.jpg",
        duration: "12 weeks",
        level: "Advanced",
        price: "$297",
        instructor: "Michael Chen"
    },
    {
        id: 6,
        title: "Mindful Leadership",
        slug: "mindful_leadership",
        category: "community",
        description: "Lead with clarity, compassion, and effectiveness through mindful practices.",
        image: "images/comm_path.webp",
        duration: "10 weeks",
        level: "Intermediate",
        price: "$247",
        instructor: "Elena Patel"
    },
    {
        id: 7,
        title: "Goal Setting Framework",
        slug: "goal_setting",
        category: "clarity",
        description: "Learn a systematic approach to setting and achieving meaningful goals.",
        image: "images/clarity_path.jpg",
        duration: "3 weeks",
        level: "Beginner",
        price: "$77",
        instructor: "Dr. Sarah Johnson"
    },
    {
        id: 8,
        title: "Time Mastery System",
        slug: "time_mastery",
        category: "mastery",
        description: "Revolutionary time management techniques used by top performers.",
        image: "images/mastery_path.png",
        duration: "5 weeks",
        level: "Intermediate",
        price: "$127",
        instructor: "Michael Chen"
    },
    {
        id: 9,
        title: "Community Networking",
        slug: "community_networking",
        category: "community",
        description: "Build meaningful professional relationships and expand your network authentically.",
        image: "images/comm_path.webp",
        duration: "6 weeks",
        level: "All Levels",
        price: "$97",
        instructor: "Elena Patel"
    }
];

function getFromStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function setLastModified() {
    const modifiedElement = document.getElementById('last-modified');
    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}

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

function initHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburgerButton.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

function getFavorites() {
    const favorites = getFromStorage('favorites');
    return favorites || [];
}

function toggleFavorite(courseId) {
    let favorites = getFavorites();
    
    if (favorites.includes(courseId)) {
        favorites = favorites.filter(function(id) {
            return id !== courseId;
        });
    } else {
        favorites.push(courseId);
    }
    
    saveToStorage('favorites', favorites);
    return favorites.includes(courseId);
}

function filterCourses(category) {
    if (category === 'all') {
        return coursesData;
    }
    return coursesData.filter(function(course) {
        return course.category === category;
    });
}

function createCourseCard(course) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(course.id);
    const heartIcon = isFavorite ? '❤️' : '🤍';
    
    return '<div class="card course-card" data-course-id="' + course.id + '">' +
        '<img src="' + course.image + '" alt="' + course.title + '" loading="lazy">' +
        '<div class="card-content">' +
        '<div style="display: flex; justify-content: space-between; align-items: start;">' +
        '<h3>' + course.title + '</h3>' +
        '<button class="favorite-btn" data-course-id="' + course.id + '" ' +
        'style="background: none; border: none; font-size: 1.5rem; cursor: pointer;" ' +
        'aria-label="Toggle favorite">' + heartIcon + '</button>' +
        '</div>' +
        '<p>' + course.description + '</p>' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">' +
        '<span style="font-size: 0.9rem; color: #666;">' +
        course.duration + ' • ' + course.level +
        '</span>' +
        '<a href="course_' + course.slug + '.html" class="cta-button" style="padding: 0.5rem 1rem; font-size: 0.9rem;">' +
        'Enroll Now' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function renderCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;
    
    if (courses.length === 0) {
        coursesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No courses found in this category.</p>';
        return;
    }
    
    const coursesHTML = courses.map(function(course) {
        return createCourseCard(course);
    }).join('');
    
    coursesGrid.innerHTML = coursesHTML;
    
    const favoriteButtons = coursesGrid.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = parseInt(btn.getAttribute('data-course-id'));
            const isFavorite = toggleFavorite(courseId);
            btn.textContent = isFavorite ? '❤️' : '🤍';
        });
    });
}

function initCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const coursesGrid = document.getElementById('courses-grid');
    
    if (!coursesGrid) return;
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                const filteredCourses = filterCourses(category);
                renderCourses(filteredCourses);
            });
        });
    }
    
    renderCourses(coursesData);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(formGroup, message) {
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(formGroup) {
    formGroup.classList.remove('error');
}

function validateField(input) {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    clearError(formGroup);
    
    if (input.hasAttribute('required') && !value) {
        showError(formGroup, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && value && !validateEmail(value)) {
        showError(formGroup, 'Please enter a valid email address');
        return false;
    }
    
    if (input.type === 'password' && value && !validatePassword(value)) {
        showError(formGroup, 'Password must be at least 6 characters');
        return false;
    }
    
    const minLength = input.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        showError(formGroup, 'Minimum ' + minLength + ' characters required');
        return false;
    }
    
    return true;
}

function initFormValidation() {
    const form = document.getElementById('community-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(input);
        });
        input.addEventListener('input', function() {
            if (input.closest('.form-group').classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(function(input) {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            handleFormSubmission(form);
        }
    });
}

function handleFormSubmission(form) {
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        interest: form.querySelector('#interest').value,
        message: form.querySelector('#message').value,
        newsletter: form.querySelector('#newsletter').checked,
        timestamp: new Date().toISOString()
    };
    
    const submissions = getFromStorage('formSubmissions') || [];
    submissions.push(formData);
    saveToStorage('formSubmissions', submissions);
    
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.textContent = 'Thank you, ' + formData.name + '! We will be in touch soon.';
    }
    
    form.reset();
    
    form.querySelectorAll('.form-group').forEach(function(group) {
        clearError(group);
    });
    
    setTimeout(function() {
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }, 5000);
}

function initLoginTabs() {
    const tabs = document.querySelectorAll('.login-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    if (!tabs.length) return;
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            contents.forEach(function(c) {
                c.classList.remove('active');
            });
            
            tab.classList.add('active');
            
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = loginForm.querySelector('#login-email');
            const password = loginForm.querySelector('#login-password');
            
            let isValid = true;
            
            if (!validateField(email)) isValid = false;
            if (!validateField(password)) isValid = false;
            
            if (isValid) {
                const userData = {
                    email: email.value,
                    loginTime: new Date().toISOString()
                };
                saveToStorage('userSession', userData);
                window.location.href = 'success.html';
            }
        });
        
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            input.addEventListener('input', function() {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = signupForm.querySelector('#signup-name');
            const email = signupForm.querySelector('#signup-email');
            const password = signupForm.querySelector('#signup-password');
            
            let isValid = true;
            
            if (!validateField(name)) isValid = false;
            if (!validateField(email)) isValid = false;
            if (!validateField(password)) isValid = false;
            
            if (isValid) {
                const userData = {
                    name: name.value,
                    email: email.value,
                    signupTime: new Date().toISOString()
                };
                saveToStorage('userSession', userData);
                window.location.href = 'success.html';
            }
        });
        
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            input.addEventListener('input', function() {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
}

function getReviewCount() {
    return getFromStorage('reviewCount') || 0;
}

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
    
    const course = coursesData.find(function(c) {
        return c.slug === courseSlug;
    });
    
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

document.addEventListener('DOMContentLoaded', function() {
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
    
    if (window.location.pathname.includes('course_')) {
        loadCourseDetails();
    }
});