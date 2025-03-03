// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Form Validation and Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    const formGroups = bookingForm.querySelectorAll('.form-group');

    const validateField = (input) => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;

        switch (input.type) {
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailPattern.test(input.value);
                errorMessage.textContent = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'datetime-local':
                const selectedDate = new Date(input.value);
                const now = new Date();
                isValid = selectedDate > now;
                errorMessage.textContent = isValid ? '' : 'Please select a future date and time';
                break;
            case 'select-one':
                isValid = input.value !== '';
                errorMessage.textContent = isValid ? '' : 'Please select a service';
                break;
            default:
                isValid = input.value.trim() !== '';
                errorMessage.textContent = isValid ? '' : 'This field is required';
        }

        formGroup.classList.toggle('error', !isValid);
        return isValid;
    };

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (group.classList.contains('error')) {
                    validateField(input);
                }
            });
        }
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && input.hasAttribute('required')) {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');

        buttonText.classList.add('hidden');
        buttonLoader.classList.remove('hidden');
        submitButton.disabled = true;

        const formData = new FormData(bookingForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! We will contact you shortly to confirm your appointment.';
            bookingForm.reset();
            bookingForm.parentNode.insertBefore(successMessage, bookingForm);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again later.';
            bookingForm.parentNode.insertBefore(errorMessage, bookingForm);

            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            buttonText.classList.remove('hidden');
            buttonLoader.classList.add('hidden');
            submitButton.disabled = false;
        }
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.7)';
    }
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonials-slider');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const cards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    const maxIndex = cards.length - Math.floor(slider.offsetWidth / cardWidth);

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';

        // Add animation class to visible cards
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + 3) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px)';
            }
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Initialize slider position
    updateSliderPosition();

    // Update maxIndex on window resize
    window.addEventListener('resize', () => {
        maxIndex = cards.length - Math.floor(slider.offsetWidth / cardWidth);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateSliderPosition();
        }
    });
});

// Gallery Before/After Slider
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        let isResizing = false;

        slider.addEventListener('mousedown', startResizing);
        document.addEventListener('mousemove', moveSlider);
        document.addEventListener('mouseup', stopResizing);

        // Touch events
        slider.addEventListener('touchstart', startResizing);
        document.addEventListener('touchmove', moveSlider);
        document.addEventListener('touchend', stopResizing);

        function startResizing(e) {
            isResizing = true;
            slider.classList.add('resizing');
        }

        function stopResizing(e) {
            isResizing = false;
            slider.classList.remove('resizing');
        }

        function moveSlider(e) {
            if (!isResizing) return;

            const event = e.type === 'mousemove' ? e : e.touches[0];
            const rect = slider.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const percentage = (x / rect.width) * 100;

            // Constrain percentage between 0 and 100
            const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

            beforeImage.style.clipPath = `polygon(0 0, ${clampedPercentage}% 0, ${clampedPercentage}% 100%, 0 100%)`;
            slider.querySelector('.slider-handle').style.left = `${clampedPercentage}%`;
        }
    });
});

// Gallery Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.classList.remove('fade-out'), 10);
                } else {
                    item.classList.add('fade-out');
                    setTimeout(() => item.classList.add('hidden'), 300);
                }
            });
        });
    });
});

// Initialize Lightbox for Gallery Images
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';

            const img = document.createElement('img');
            img.src = image.src;

            lightbox.appendChild(img);
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
});

// Add lightbox styles
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    }

    .lightbox img {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    }
`;
document.head.appendChild(style);

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');

    if (!cookieChoice) {
        // Show the banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieConsent.classList.remove('show');
        // Here you could initialize your analytics or other cookie-dependent features
    });

    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'declined');
        cookieConsent.classList.remove('show');
    });
});
